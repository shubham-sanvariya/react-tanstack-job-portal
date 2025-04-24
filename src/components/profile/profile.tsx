
import {Avatar, Divider, FileInput, Overlay} from "@mantine/core";
import {useHover} from "@mantine/hooks";
import {IconEdit} from "@tabler/icons-react";
import { getBase64 } from "../utils/utility";
import {successNotification} from "../notification/notification.tsx";
import Info from "./info.tsx";
import About from "./about.tsx";
import useProfile from "../../hooks/useProfile.tsx";
import Skills from "./skills.tsx";
import Experience from "./experience.tsx";
import Certification from "./certification.tsx";
import {ProfileType} from "../../types/profileType.ts";


const Profile = () => {
    const { hovered, ref } = useHover();
    const {profile: profileState, updateProfileMutate} = useProfile();

    const handleFileUpload = async (file: File | null) => {
        if (file == null) return;
        try {
            const picture = await getBase64(file);

            const updatedProfile = {...profileState, picture : picture.split(',')[1]};
            updateProfileMutate(updatedProfile as ProfileType)
            successNotification("Success","Profile Picture Updated Successfully")
        } catch (error) {
            console.error('Error reading file:', error);
        }
    };

    return (
        <div className={'w-4/5 mx-auto'}>
            <div className={'relative'}>
                <img className={'rounded-t-2xl xs-mx:!h-32'} src={`/assets/Profile/banner.jpg`} alt={"profile"}/>
                <div ref={ref} className={'absolute flex items-center justify-center -bottom-1/4 left-6 md-mx:-bottom-10 sm-mx:-bottom-16'}>
                    <Avatar className="!w-48 !h-48  border-mine-shaft-950 border-8 rounded-full md-mx:!w-40 md-mx:!h-40 sm-mx:!w-36 sm-mx:!h-36 xs-mx:!w-32 xs-mx:!h-32 " src={profileState?.picture?`data:image/jpeg;base64,${profileState.picture}`:'/assets/avatar.png'}/>
                    {hovered && <Overlay className="!rounded-full" backgroundOpacity={0.75}/>}
                    {hovered && <IconEdit className={'absolute z-[300] !w-16 !h-16'}/>}
                    {hovered && <FileInput className={'absolute [&_*]:!rounded-full z-[301] [&_*]:!h-full !h-full w-full'}
                                           onChange={handleFileUpload}
                                           variant={'transparent'} accept={"image/*"}/> }
                </div>
            </div>
            <div className={'px-3 !mt-24'}>
                <Info/>
            </div>
            <Divider mx={'xs'} my={"xl"}/>
            <div className={'px-3'}>
                <About/>
            </div>
            <Divider mx={'xs'} my={"xl"}/>
            <div className={'px-3'}>
                <Skills/>
            </div>
            <Divider mx={'xs'} my={"xl"}/>
            <div className={'px-3'}>
                <Experience/>
            </div>
            <Divider mx={'xs'} my={"xl"}/>
                <Certification/>

        </div>
    )
}
export default Profile
