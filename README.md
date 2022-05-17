# Send Cloud Build Status to Bitbucket

## Keywords

Google Cloud Platform (GCP),
Cloud Build, Pub/Sub, Cloud Functions, Bitbucket, Build Checks

## Description

This is a firebase functions project ready to be configured and deployed.
it subscribes to the 'cloud-builds' default gcp topic.
Whenever Cloud Build runs, the status will be pushed to Bitbucket.

## Setup

* change firebase.json configuration to your project's name
* login with firebase tools https://firebase.google.com/docs/functions/get-started
* set up the environment variables BB_USERNAME and BB_PASSWORD with your bitbucket's client id and secret:  https://cloud.google.com/functions/docs/configuring/env-var#functions_env_var_access-nodejs
* inside /functions run:
* npm install
* npm run deploy