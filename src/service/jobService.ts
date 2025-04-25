import {api} from "../apiConfig/axiosConfig.ts";
import {handleError} from "./errorService.ts";

const base_URL = "/jobs"

export const getJobs = async (jobStatus? : string, page = 0, size = 5, sort? :string) => {
    try {
        let params : Record<string, number | string> = { page, size };
        if (jobStatus !== undefined){
            params = {...params,jobStatus}
        }
        if (sort !== undefined){
            params = {...params,sort}
        }
        const res = await api.get(base_URL,{ params });
        return res.data;
    }catch (err : unknown){
        handleError(err,"Failed to fetch jobs");
        throw err;
    }
}
