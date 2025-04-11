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
}

export const DefaultRegisterUserValue : RegisterUserType = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "APPLICANT"
}

export const registerFormKeyAndTypes: Array<[keyof RegisterUserType, string, string, string]> = [
    ["username", "string", "Username","TextInput"],
    ["email", "string", "Email","TextInput"],
    ["password", "string", "Picture", "PasswordInput"],
    ["confirmPassword", "string", "Picture", "PasswordInput"],
]
