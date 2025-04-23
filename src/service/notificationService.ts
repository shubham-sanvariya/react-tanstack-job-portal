import {api} from "../apiConfig/axiosConfig.ts";
import {handleError} from "./errorService.ts";

const BASE_URL = "/notifications"

export const getAllNotificationByUserId = async (userId: number) => {
    try {
        const res = await api.get(`${BASE_URL}/unread/${userId}`);
        return res.data;
    } catch (err: unknown) {
        handleError(err,"Failed to fetch notifications");
        throw err;
    }
}
