import {useQuery} from "@tanstack/react-query";
import {getAllProfiles} from "../service/profileService.ts";

interface GetUserProfileProps{
    page?: number;
    size?: number;
    sort?: string;
}

const UseProfiles = ({page = 1,
                         size = 10,
                         sort = "createdAt,desc"
                     }: GetUserProfileProps) => {

    return useQuery({
        queryKey: ["profiles",page,size,sort],
        queryFn: async () => getAllProfiles(page,size,sort)
    })
}
export default UseProfiles
