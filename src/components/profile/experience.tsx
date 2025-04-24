import {ActionIcon} from "@mantine/core";
import {IconPencil, IconPlus, IconX} from "@tabler/icons-react";

import {useState} from "react";
import {useMediaQuery} from "@mantine/hooks";
import {ExperienceType} from "../../types/profileType.ts";
import ExpCard from "./expCard.tsx";
import ExpInput from "./expInput.tsx";
import useProfile from "../../hooks/useProfile.tsx";

const Experience = () => {
    const [edit, setEdit] = useState<boolean>(false);
    const [addExp, setAddExp] = useState(false);
    const matches = useMediaQuery('(min-width: 475px)');
    const {profile: profileState} = useProfile();

    const handleEdit = () => {
        if (!edit) {
            setEdit(true)
        } else {
            setEdit(false);
        }
    }

    return (
        <div>
            <div className={'flex flex-wrap justify-between text-2xl font-semibold mb-5'}>Experience
                <div className={'flex gap-2'}>
                    <ActionIcon size={matches ? "md" : "lg"} color={'bright-sun.4'} variant={'subtle'}
                                onClick={() => setAddExp(true)}
                    >
                        <IconPlus
                            className="h-4/5 w-4/5"
                        />
                    </ActionIcon>
                    <ActionIcon size={matches ? "md" : "lg"} color={edit ? 'red.8':'bright-sun.4'} variant={'subtle'}
                                onClick={handleEdit}
                    >
                        {edit ? <IconX className={'h-4/5 w-4/5'}/> :
                            <IconPencil className={'h-4/5 w-4/5'}/>}
                    </ActionIcon>
                </div>
            </div>
            <div className={'flex flex-col gap-8'}>
                {
                    profileState?.experiences?.map((exp: ExperienceType, index: number) => (
                        <ExpCard key={index} index={index} {...exp} edit={edit}/>
                    ))
                }
                {addExp && <ExpInput add setEdit={setAddExp}/>}
            </div>
        </div>
    )
}
export default Experience
