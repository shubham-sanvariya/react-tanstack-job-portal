import {useQuery} from "@tanstack/react-query";
import {getUser} from "../service/userService.ts";

const useUser = () => {
    const userState =  useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        staleTime: Infinity
    })

    return { userState }
}
export default useUser
