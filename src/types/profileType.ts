export interface ProfileType {
    id: number;
    name : string;
    jobTitle: string;
    company: string;
    location: string;
    about: string;
    totalExperience : number;
    picture : string;
    skills: string[];
    experiences: ExperienceType[];
    certificates: CertificationType[];
    savedJobs : number[];
}

export interface ExperienceType {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    working: boolean;
}

export interface CertificationType {
    title: string;
    issuer: string;
    issueDate: string;
    certificateId: string;
}

export interface UserType {
    id: number,
    name: string,
    accountType: string,
    profileId: number
}
