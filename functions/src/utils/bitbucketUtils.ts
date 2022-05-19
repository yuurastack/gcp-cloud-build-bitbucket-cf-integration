import axios from "axios";
import {RespContainer} from "../models/bitbucket";
import qs = require("qs");


export function getBitbucketState(status: string): string {
  switch (status.toLowerCase()) {
    case "success":
      return "SUCCESSFUL";
    case "queued":
    case "working":
      return "INPROGRESS";
    default:
      return "FAILED";
  }
}

// better error handling for promises using async
async function safePromise(promise: Promise<any>):Promise<any[]> {
  return promise.then((data) => [data]).catch((error) => [null, error]);
}

export async function getAuthToken(): Promise<[string, string]> {
  const username: string = process.env.BB_USERNAME || "";
  const password: string = process.env.BB_PASSWORD || "";
  const data = qs.stringify({
    "grant_type": "client_credentials",
  });
  const config = {
    method: "post",
    url: "https://bitbucket.org/site/oauth2/access_token",
    headers: {
      "Authorization": "Basic Y2xpZW50X2lkOnNlY3JldA==",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data,
    auth: {
      username,
      password,
    },
  };
  const respContainer = {} as RespContainer;
  [respContainer.response, respContainer.error] = await safePromise(axios(config));
  if (respContainer.error) {
    return ["", "error"];
  }

  return [respContainer.response.data.access_token, ""];
}
