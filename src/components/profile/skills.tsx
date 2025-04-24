import {ActionIcon, TagsInput} from "@mantine/core";
import {IconCheck, IconPencil, IconX} from "@tabler/icons-react";
import {useState} from "react";
import {useMediaQuery} from "@mantine/hooks";
import useProfile from "../../hooks/useProfile.tsx";
import {successNotification} from "../notification/notification.tsx";
import {ProfileType} from "../../types/profileType.ts";

const Skills = () => {
    const [edit, setEdit] = useState<boolean>(false);
    const {profile: profileState,updateProfileMutate} = useProfile();
    const matches = useMediaQuery('(min-width: 475px)');
    const [skills, setSkills] = useState<string[]>(profileState?.skills ?? []);


    const handleEdit = () => {
        if (!edit) {
            setSkills(profileState?.skills ?? []);
            setEdit(true)
        } else {
            setEdit(false);
        }
    }

    const handleSave = () => {
        setEdit(false);
        const updatedProfile = {...profileState, skills};
        updateProfileMutate(updatedProfile as ProfileType);
        successNotification("Success", "Skills Updated Successfully.")
    }
    return (
        <div>
            <div className={'flex justify-between text-2xl font-semibold mb-3'}>Skills
                <div>

                    <ActionIcon size={matches ? "md" : "lg"} color={'green.8'} variant={'subtle'}
                                onClick={handleSave}
                    >
                        {edit && <IconCheck className={'h-4/5 w-4/5'}/>}
                    </ActionIcon>
                    <ActionIcon size={matches ? "md" : "lg"} color={edit ? 'red.8':'bright-sun.4'} variant={'subtle'}
                                onClick={handleEdit}
                    >
                        {edit ? <IconX className={'h-4/5 w-4/5'}/> :
                            <IconPencil className={'h-4/5 w-4/5'}/>}
                    </ActionIcon>
                </div>
            </div>
            {
                edit ? <TagsInput
                        value={skills}
                        onChange={setSkills}
                        placeholder={'Enter tag'}
                        splitChars={[',', ' ', '|']}
                    />
                    :
                    <div className={'flex flex-wrap gap-2'}>
                        {
                            profileState?.skills?.map((skill: string, index: number) => (
                                <div key={index}
                                     className={'bg-bright-sun-300 font-medium fow bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1'}>
                                    {skill}
                                </div>
                            ))
                        }
                    </div>
            }
        </div>
    )
}
export default Skills
