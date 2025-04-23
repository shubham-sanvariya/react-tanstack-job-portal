import {api} from "../apiConfig/axiosConfig.ts";
import {UserType} from "../types/profileType.ts";

const base_URL = "/users"

export const getUser = () => {
    const user = localStorage.getItem("user");
    if (user){
        const res : UserType = JSON.parse(user);
        return res;
    }
    return null;
}

export  const changePassword = async ( email : string, password : string) => {
    try {
        const res = await api.post(`${base_URL}/changePass`, {email,password});
        return res.data;
    }catch (err : unknown) {
        console.log(err);
        throw err;
    }
}

export const updateUserName = async ( id : number, newUsername : string) => {
    try {
        const res = await api.patch(`${base_URL}/update/${id}/username?userName=${newUsername}`);
        return res.data;
    }catch (err : unknown){
        console.log(err);
        throw err;
    }
}
