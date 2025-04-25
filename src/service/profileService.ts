import {api} from "../apiConfig/axiosConfig.ts";
import {handleError} from "./errorService.ts";
import {ProfileType} from "../types/profileType.ts";

const base_URL = "/profiles"

export const getProfileById = async ( profileId: number ) => {
    try {
        const res = await api.get(`${base_URL}/${profileId}`);
        return res.data;
    }catch (err : unknown){
        handleError(err,"Failed to fetch user profile")
        throw err;
    }
}

export const updateProfile = async (profile : ProfileType) => {
    try {
        const res = await api.put(`${base_URL}/update`,profile);
        return res.data;
    }catch (err : unknown){
        console.error("Failed update profile service");
        throw err;
    }
}

export const getAllProfiles = async (page = 0, size = 5, sort? :string) => {
    try {
        let params : Record<string, number | string> = { page, size };

        if (sort !== undefined){
            params = {...params,sort}
        }
        const res = await api.get(base_URL, { params });
        return res.data;
    }catch (err : unknown){
        handleError(err,"Failed to fetch Talents");
        throw err;
    }
}
