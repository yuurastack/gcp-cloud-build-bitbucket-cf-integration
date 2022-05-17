import * as functions from "firebase-functions";
import axios from "axios";
import {CloudBuildData} from "./models/cloud-build";
import {getAuthToken, getBitbucketState} from "./utils/bitbucketUtils";

exports.bitbucketBuildStatus = functions.pubsub.topic("cloud-builds").onPublish(async (message: functions.pubsub.Message) => {
  const pubsubMessage = message.data;
  const dataString = Buffer.from(pubsubMessage, "base64").toString();
  const data: CloudBuildData = JSON.parse(dataString);
  const commitSha: string = data.sourceProvenance.resolvedRepoSource.commitSha;
  const repoName = data.sourceProvenance.resolvedRepoSource.repoName;
  const [, workspace, repoSlug]: string[] = repoName.split("_");

  // build Bitbucket payload
  const payload = {
    type: "string",
    created_on: data.createTime,
    description: `Status: ${data.status}`,
    key: "string",
    name: "Google Cloud Build",
    refname: `buildTriggerId: ${data.buildTriggerId}`,
    state: getBitbucketState(data.status),
    updated_on: data.finishTime,
    url: data.logUrl,
    uuid: data.id,
  };

  // Send request to Bitbucket Oauth.
  const [token, error] = await getAuthToken();
  if (error) {
    console.log( "Bitbucket Auth Error");
    return;
  }
  const url = `"https://api.bitbucket.org/2.0/repositories"/${workspace}/${repoSlug}/commit/${commitSha}/statuses/build`;


  const config = {
    method: "post",
    url,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    data: payload,
    payload,
  };
  // Send request to Bitbucket Build.
  postBuild(config);
});


function postBuild(config: any, retry=0) {
  if (retry > 3) {
    console.log("Bitbucket build won't respond");
    return;
  }

  axios(config)
      .then((reponse) => {
        console.log(reponse);
      })
      .catch((error) => {
        console.log(error);
        postBuild(config, retry +1);
      });
}
