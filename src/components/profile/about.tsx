import {useState} from 'react'
import {ActionIcon, Textarea} from "@mantine/core";
import {IconCheck, IconPencil, IconX} from "@tabler/icons-react";
import {useMediaQuery} from "@mantine/hooks";
import {successNotification} from "../notification/notification.tsx";
import {ProfileType} from "../../types/profileType.ts";
import useProfile from "../../hooks/useProfile.tsx";

const About = () => {
    const [edit, setEdit] = useState<boolean>(false);
    const matches = useMediaQuery('(min-width: 475px)');
    const {profile: profileState} = useProfile();

    const [about, setAbout] = useState(profileState?.about || "");
    const { updateProfileMutate } = useProfile();

    const handleEdit = () => {
        if (!edit) {
            setAbout(profileState?.about ?? "");
            setEdit(true)
        } else {
            setEdit(false);
        }
    }

    const handleSave = () => {
        setEdit(false);
        const updatedProfile = {...profileState, about};
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
