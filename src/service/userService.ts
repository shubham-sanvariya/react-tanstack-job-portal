import {api} from "../apiConfig/axiosConfig.ts";

const base_URL = "/users"


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
