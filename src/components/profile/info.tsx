import {ActionIcon, NumberInput} from "@mantine/core";
import { IconBriefcase, IconCheck, IconMapPin, IconPencil, IconX } from "@tabler/icons-react";

import { useState } from "react";
import { hasLength, useForm } from "@mantine/form";
import {useMediaQuery} from "@mantine/hooks";
import useProfile from "../../hooks/useProfile.tsx";
import { ProfileType } from "../../types/profileType.ts";
import useUser from "../../hooks/useUser.tsx";
import SelectInput from "./selectInput.tsx";
import { fields } from "../../Data/PostJob.tsx";
import {successNotification} from "../notification/notification.tsx";

const Info = () => {
    const [edit, setEdit] = useState<boolean>(false);
    const matches = useMediaQuery('(min-width: 475px)');
    const {profile: profileState, updateProfileMutate} = useProfile();
    const {user: userState, updateUserNameMutate} = useUser();

    const handleEdit = () => {
        if (!edit) {
            setEdit(true)
            form.setValues({
                name: profileState?.name,
                jobTitle: profileState?.jobTitle,
                company: profileState?.company,
                location: profileState?.location,
                totalExp: profileState?.totalExperience
            })
        } else setEdit(false);
    }

    const handleSave = () => {
        if (isFormValid) {
            console.log("Form values before dispatch:", form.getValues());
            const updatedProfile = { ...profileState, ...form.getValues() };
            if (userState?.id && userState?.name !== updatedProfile.name) {
                updateUserNameMutate({id : userState.id ,newUsername : updatedProfile.name})
            }
            updateProfileMutate(updatedProfile as ProfileType);
            setEdit(false);
            successNotification("Success", "Profile Info Updated Successfully.")
        }
    }

    const form = useForm({
        mode: "controlled",
        initialValues: { name: "", jobTitle: "", company: "", location: "", totalExp: 0},
        validate: {
            name: hasLength({ min: 3, max: 100 }, 'Characters must be between 3 to 100'),
            jobTitle: hasLength({ min: 3 }, 'Must be at least 3 Characters')
            , company: hasLength({ min: 3 }, 'Must be at least 3 Characters')
            , location: hasLength({ min: 3 }, 'Must be at least 3 Characters'),
            totalExp: (value) => isNaN(value) ? "Total experience must be a number" : null
        },
        validateInputOnChange: true
    })

    const isFormValid = form.isValid();


    return (
        <>
            <div className={'flex justify-between text-3xl font-semibold xs-mx:text-2xl'}>{profileState?.name}
                <div>

                    <ActionIcon size={matches ? "md" : "lg"} color={'green.8'} variant={'subtle'}
                        onClick={handleSave}
                    >
                        {edit && isFormValid && <IconCheck className={'h-4/5 w-4/5'} />}
                    </ActionIcon>
                    <ActionIcon size={matches ? "md" : "lg"} color={edit ? 'red.8' : 'bright-sun.4'} variant={'subtle'}
                        onClick={handleEdit}
                    >
                        {edit ? <IconX className={'h-4/5 w-4/5'} /> :
                            <IconPencil className={'h-4/5 w-4/5'} />}
                    </ActionIcon>
                </div>
            </div>
            {edit ? <>
                <SelectInput form={form} name={"name"} {...fields[0]} />
                <div className={'flex gap-10 [&>*]:w-1/2 my-3 [&>*]:xs-mx:w-full xs-mx:flex-wrap xs-mx:gap-5'}>
                    <SelectInput form={form} name={"jobTitle"} {...fields[1]} />
                    <SelectInput form={form} name={"company"} {...fields[2]} />
                </div>
                <div className={'flex gap-10 [&>*]:w-1/2 my-3 [&>*]:xs-mx:w-full xs-mx:flex-wrap xs-mx:gap-5'}>
                    <SelectInput form={form} name={"location"} {...fields[3]} />
                    <NumberInput label={"Total Experience"} min={0}
                                 max={50} {...form.getInputProps('totalExp')} hideControls withAsterisk/>
                </div>
            </>
                :
                <>
                    <div className={'text-xl flex gap-1 items-center xs-mx:text-base'}><IconBriefcase
                        className={'h-5 w-5'} /> {profileState?.jobTitle} &bull; {profileState?.company}
                    </div>
                    <div className={'flex gap-1 text-lg text-mine-shaft-400 items-center xs-mx:text-base'}>
                        <IconMapPin className={'h-5 w-5'} stroke={1.5} /> {profileState?.location}
                    </div>
                    <div className={'flex gap-1 text-lg text-mine-shaft-400 items-center xs-mx:text-base'}>
                        <IconBriefcase className={'h-5 w-5'} stroke={1.5} />Experience : {profileState?.totalExperience}
                    </div>
                </>
            }
        </>
    )
}
export default Info
