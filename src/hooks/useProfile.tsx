import {useMutation, useQuery} from "@tanstack/react-query";
import {getProfileById, updateProfile} from "../service/profileService.ts";
import {ProfileType} from "../types/profileType.ts";
import queryClient from "../service/queryClient.ts";
import {successNotification} from "../components/notification/notification.tsx";
import {handleError} from "../service/errorService.ts";
import useUser from "./useUser.tsx";

const UseProfile = () => {

    const { user } = useUser();

    const profileState = useQuery<ProfileType>({
        queryKey: ["userProfile", user?.profileId],
        queryFn: () => getProfileById(Number(user?.profileId)),
        enabled: !!user?.profileId
    })

    const { data : profile, isPending : isUserProfilePending, error: userProfileError } = profileState;

    const {mutate: updateProfileMutate} = useMutation({
        mutationFn: updateProfile,
        onMutate: async (updatedProfile: ProfileType) => {
            await queryClient.cancelQueries({
                queryKey: ["userProfile", user?.profileId]
            });

            const previousProfile = queryClient.getQueryData<ProfileType>(["userProfile", user?.profileId]);

            queryClient.setQueryData(["userProfile", user?.profileId], updatedProfile);

            return {previousProfile}
        },
        onSuccess: () => {
            successNotification("Success", "About Updated Successfully.")
        },
        onError: (error, _, context) => {
            if (context?.previousProfile){
                queryClient.setQueryData(['userProfile', user?.id], context.previousProfile);
            }
            handleError(error,"Failed to update About section");
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["userProfile", user?.profileId]
            }).then();
        }
    })

    return {updateProfileMutate, profile, isUserProfilePending, userProfileError}
}
export default UseProfile
