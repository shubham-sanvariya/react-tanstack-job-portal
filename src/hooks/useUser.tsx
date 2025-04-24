import {useQuery} from "@tanstack/react-query";
import {getUser} from "../service/userService.ts";
import {getProfileById} from "../service/profileService.ts";
import {ProfileType} from "../types/profileType.ts";

const useUser = () => {

    const userState =  useQuery({
        queryKey: ["user"],
        queryFn: getUser,
    });

    const { data : user, isPending, error } = userState;

        const profileState = useQuery<ProfileType>({
            queryKey: ["userProfile", user?.profileId],
            queryFn: () => getProfileById(Number(user?.profileId)),
            enabled: !!user?.profileId
        })


    const { data : profile, isPending : isUserProfilePending, error: userProfileError } = profileState;

    return { user, isPending, error, profile, isUserProfilePending, userProfileError };
}
export default useUser
