import {useState} from 'react'
import {ActionIcon, Textarea} from "@mantine/core";
import {IconCheck, IconPencil, IconX} from "@tabler/icons-react";
import {useMediaQuery} from "@mantine/hooks";
import useUser from "../../hooks/useUser.tsx";
import {successNotification} from "../notification/notification.tsx";
import {useMutation} from "@tanstack/react-query";
import {updateProfile} from "../../service/profileService.ts";
import {ProfileType} from "../../types/profileType.ts";
import queryClient from "../../service/queryClient.ts";
import {handleError} from "../../service/errorService.ts";

const About = () => {
    const [edit, setEdit] = useState<boolean>(false);
    const matches = useMediaQuery('(min-width: 475px)');
    const {profile: profileState, user} = useUser();

    const [about, setAbout] = useState(profileState?.about || "");

    const handleEdit = () => {
        if (!edit) {
            setAbout(profileState?.about ?? "");
            setEdit(true)
        } else {
            setEdit(false);
        }
    }

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

    const handleSave = () => {
        setEdit(false);
        const updatedProfile = {...profileState, about};
        // dispatch(updateProfileAsyncThunk(updatedProfile as ProfileType));
        updateProfileMutate(updatedProfile as ProfileType);

        successNotification("Success", "About Updated Successfully.")
    }

    return (
        <div>
            <div className={'flex justify-between text-2xl font-semibold mb-3'}>About
                <div>
                    <ActionIcon size={matches ? "md" : "lg"} color={'green.8'} variant={'subtle'}
                                onClick={handleSave}
                    >
                        {edit && <IconCheck className={'h-4/5 w-4/5'}/>}
                    </ActionIcon>
                    <ActionIcon size={matches ? "md" : "lg"} color={edit ? 'red.8' : 'bright-sun.4'} variant={'subtle'}
                                onClick={handleEdit}
                    >
                        {edit ? <IconX className={'h-4/5 w-4/5'}/> :
                            <IconPencil className={'h-4/5 w-4/5'}/>}
                    </ActionIcon>
                </div>
            </div>
            {edit ? <Textarea
                    placeholder={'Enter About YourSelf...'}
                    minRows={3}
                    autosize
                    value={about}
                    onChange={(event) => setAbout(event.currentTarget.value)}
                />
                :
                <div className={'text-sm text-mine-shaft-300 text-justify'}>
                    {profileState?.about}
                </div>
            }
        </div>
    )
}
export default About
