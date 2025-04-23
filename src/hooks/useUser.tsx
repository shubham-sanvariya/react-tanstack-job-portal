import {useQuery} from "@tanstack/react-query";
import {getUser} from "../service/userService.ts";

const useUser = () => {
    const userState =  useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        staleTime: Infinity
    })

    const { data : user, isPending, error } = userState;

    return { user, isPending, error };
}
export default useUser
