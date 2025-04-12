import axios from "axios";
import { LoginType, RegisterUserType } from "../types/authType";

const base_URL = "http://localhost:8080/auth"

export const registerUser = async (user: Omit<RegisterUserType, "TermsAndConditions" | "confirmPassword">) => {
    try {
        const response = await axios.post(`${base_URL}/register`, user);
        return response.data;
    } catch (error: unknown) {
        console.log(error);
        throw error;
    }
}

export const loginUser = async (login: LoginType) => {
    try {
        const response = await axios.post(`${base_URL}/login`, login);
        return response.data;
    } catch (error: unknown) {
        console.log(error);
        throw error;
    }
}

export const sendOtp = async (email: string, check: string) => {
    try {
        const params = { email, check };
        const res = await axios.post(`${base_URL}/sendOtp`, null, { params });
        return res.data;
    } catch (error: unknown) {
        console.log(error);
        throw error;
    }
}

export const verifyOtp = async (email: string, otp: string) => {
    try {
        const res = await axios.get(`${base_URL}/verifyOtp/${email}/${otp}`);
        return res.data;
    } catch (error: unknown) {
        console.log(error);
        throw error;
    }
}

