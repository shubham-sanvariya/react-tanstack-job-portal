export interface JobType {
    id: number;
    jobTitle: string;
    company: string;
    applicants: ApplicantType[];
    about: string;
    experience: string;
    jobType: string;
    location: string;
    packageOffered: number;
    postTime: string;
    description: string;
    skillRequired: string[];
    jobStatus: string;
    postedBy: number;
}

export const JobInitialValues : JobType = {
    id: 0,
    jobTitle: "",
    company: "",
    applicants: [],
    about: "",
    experience: "",
    jobType: "",
    location: "",
    packageOffered: 0,
    postTime: "",
    description: "",
    skillRequired: [],
    jobStatus : "",
    postedBy: 0
}

export interface ApplicantType {
    applicantId: number;
    name: string;
    email: string;
    phone: number;
    website: string;
    resume: string;
    coverLetter: string;
    timeStamp: string; // LocalDateTime can be represented as an ISO string
    applicationStatus: ApplicationStatusEnum;
    interviewTime: string;
}
export interface ApplicationType {
    id : number;
    applicantId: number;
    interviewTime?: string; // LocalDateTime is usually serialized as an ISO string
    applicationStatus: string;
}

export enum ApplicationStatusEnum {
    APPLIED = "APPLIED",
    INTERVIEWING = "INTERVIEWING",
    OFFERED = "OFFERED",
    REJECTED = "REJECTED"
}
