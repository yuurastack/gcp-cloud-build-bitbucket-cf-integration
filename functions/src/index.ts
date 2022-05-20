import * as functions from "firebase-functions";
import axios, { AxiosRequestConfig } from "axios";
import {CloudBuildData} from "./models/cloud-build";
import {getAuthToken, getBitbucketState} from "./utils/bitbucketUtils";

exports.bitbucketBuildStatus = functions.pubsub.topic("cloud-builds").onPublish(async (message: functions.pubsub.Message) => {
  const pubsubMessage: string = message.data;
  const dataString: string = Buffer.from(pubsubMessage, "base64").toString();
  const data: CloudBuildData = JSON.parse(dataString);
  const commitSha: string = data.sourceProvenance.resolvedRepoSource.commitSha;
  const repoName: string = data.sourceProvenance.resolvedRepoSource.repoName;
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
  if (!!error) {
    console.error(error);
    return;
  }
  const url = `https://api.bitbucket.org/2.0/repositories/${workspace}/${repoSlug}/commit/${commitSha}/statuses/build`;


  const config: AxiosRequestConfig<any> = {
    method: "post",
    url,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    data: payload,
  };

  // Send request to Bitbucket Build.
  postBuild(config);
});


function postBuild(config: AxiosRequestConfig<any>) {
  axios(config)
      .then(() => {
        console.log("successful build post");
      })
      .catch(() => {
        console.error("unsuccessful build post");
      });
}
