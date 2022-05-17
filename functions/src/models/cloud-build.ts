
export interface RepoSource {
    projectId: string;
    repoName: string;
    commitSha: string;
}

export interface Source {
    repoSource: RepoSource;
}

export interface Results {
    buildStepImages: string[];
    buildStepOutputs: string[];
}

export interface Timing {
    startTime: string;
    endTime: string;
}

export interface PullTiming {
    startTime: string;
    endTime: string;
}

export interface Step {
    name: string;
    args: string[];
    id: string;
    timing: Timing;
    status: string;
    pullTiming: PullTiming;
    waitFor: string[];
}

export interface ResolvedRepoSource {
    projectId: string;
    repoName: string;
    commitSha: string;
}

export interface SourceProvenance {
    resolvedRepoSource: ResolvedRepoSource;
}

export interface Options {
    substitutionOption: string;
    logging: string;
    dynamicSubstitutions: boolean;
    pool: any;
}

export interface Substitutions {
    REPO_NAME: string;
    REVISION_ID: string;
    COMMIT_SHA: string;
    SHORT_SHA: string;
    BRANCH_NAME: string;
    REF_NAME: string;
    TRIGGER_NAME: string;
    TRIGGER_BUILD_CONFIG_PATH: string;
}

export interface BUILD {
    startTime: string;
    endTime: string;
}

export interface FETCHSOURCE {
    startTime: string;
    endTime: string;
}

export interface Timing2 {
    BUILD: BUILD;
    FETCHSOURCE: FETCHSOURCE;
}

export interface CloudBuildData {
    id: string;
    status: string;
    source: Source;
    createTime: string;
    startTime: string;
    finishTime: Date;
    results: Results;
    steps: Step[];
    timeout: string;
    projectId: string;
    logsBucket: string;
    sourceProvenance: SourceProvenance;
    buildTriggerId: string;
    options: Options;
    logUrl: string;
    substitutions: Substitutions;
    tags: string[];
    timing: Timing2;
    queueTtl: string;
    name: string;
}

