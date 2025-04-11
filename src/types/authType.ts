export interface LoginType {
    email : string;
    password: string;
}

export interface RegisterUserType {
    name: string;
    email: string;
    password: string;
    accountType: "APPLICANT" | "EMPLOYER";
}

export const  DefaultLoginValue : LoginType = {
    email: "",
    password: ""
}