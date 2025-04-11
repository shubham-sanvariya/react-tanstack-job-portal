export interface LoginType {
    email : string;
    password: string;
}

export const  DefaultLoginValue : LoginType = {
    email: "",
    password: ""
}

export interface RegisterUserType {
    name: string;
    email: string;
    password: string;
    accountType: "APPLICANT" | "EMPLOYER";
}

export const DefaultRegisterUserValue : RegisterUserType = {
    name: "",
    email: "",
    password: "",
    accountType: "APPLICANT"
}