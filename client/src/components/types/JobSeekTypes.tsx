export type InterviewType = {
    interviewDateTime: string | null;
    interviewId: number;
    interviewLocation: string | null;
    interviewMode: string;
    interviewStatus: string;
    interviewer: UserType;
}

export type UserType = {
    email: string;
    firstName: string;
    lastName: string;
    userId: number;
    username: string;
}

export type JobType = {
    jobDescription: string | null;
    jobId: number;
    jobLocation: string;
    jobStatus: string;
    jobTitle: string;
};

export type JobApplyType = {
    job: JobType;
    jobApplyId: number;
    status: string;
    user: UserType;
};