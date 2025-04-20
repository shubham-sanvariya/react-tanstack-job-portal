import {api} from "../apiConfig/axiosConfig.ts";
import {handleError} from "./errorService.ts";

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
