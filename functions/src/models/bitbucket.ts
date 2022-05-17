export interface BitbucketAuthResponse {
    scopes: string;
    access_token: string;
    expires_in: number;
    token_type: string;
    state: string;
    refresh_token: string;
}

export interface RespContainer {
    response: BitbucketAuthResponse,
    error: string
}

export interface BitbucketBuildPayload {
    type: string;
    created_on: string;
    description: string;
    key: string;
    name: string;
    refname: string;
    state: string;
    updated_on: Date;
    url: string;
    uuid: string;
}
