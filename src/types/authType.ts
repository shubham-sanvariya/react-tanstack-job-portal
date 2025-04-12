import {InputComponents} from "../components/registerInputComponent/inputComponent.tsx";

export interface LoginType {
    email : string;
    password: string;
}

export const  DefaultLoginValue : LoginType = {
    email: "",
    password: ""
}

export interface RegisterUserType {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    accountType: "APPLICANT" | "EMPLOYER";
    TermsAndConditions : boolean;
}

export const DefaultRegisterUserValue : RegisterUserType = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "APPLICANT",
    TermsAndConditions: false
}

type InputComponentType  = keyof typeof InputComponents;

export const registerFormKeyAndTypes: Array<[keyof Omit<RegisterUserType, "TermsAndConditions" | "accountType">, string,string, InputComponentType]> = [
    ["username", "Full Name", "Enter Your Full Name","TextInput"],
    ["email", "Email", "Enter Your Email","TextInput"],
    ["password", "Password", "Enter Your Password", "PasswordInput"],
    ["confirmPassword", "Confirm Password", "Enter Your Confirm Password", "PasswordInput"],
]
