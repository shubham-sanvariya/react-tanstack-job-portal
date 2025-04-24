import { ActionIcon } from "@mantine/core";
import {IconPencil, IconPlus, IconX} from "@tabler/icons-react";
import {useState} from "react";
import {useMediaQuery} from "@mantine/hooks";
import useProfile from "../../hooks/useProfile.tsx";
import CertiInput from "./certiInput.tsx";
import CertiCard from "./certiCard.tsx";
import {CertificationType} from "../../types/profileType.ts";

const Certification = () => {
    const [edit, setEdit] = useState(false);
    const [addCertificate, setAddCertificate] = useState(false);
    const matches = useMediaQuery('(min-width: 475px)');
    const {profile: profileState} = useProfile();

    const handleClick = () => {
        setEdit(!edit);
    }

    return (
        <div className={'px-3'}>
            <div className={'flex justify-between text-2xl font-semibold mb-5'}>Certifications
                <div className={'flex gap-2'}>
                    <ActionIcon size={matches ? "md" : "lg"} color={'bright-sun.4'} variant={'subtle'}
                                onClick={() => setAddCertificate(true)}
                    >
                        <IconPlus
                            className="h-4/5 w-4/5"
                        />
                    </ActionIcon>
                    <ActionIcon size={matches ? "md" : "lg"} color={edit ? "red.8":'bright-sun.4'} variant={'subtle'}
                                onClick={handleClick}
                    >
                        {edit ? <IconX className={'h-4/5 w-4/5'}/> :
                            <IconPencil className={'h-4/5 w-4/5'}/>}
                    </ActionIcon>
                </div>
            </div>
            <div className={'flex flex-col gap-8'}>
                {
                    profileState?.certificates?.map((certi: CertificationType, index: number) => (
                        <CertiCard key={index} index={index} edit={edit} {...certi}/>
                    ))
                }
                {
                    addCertificate && <CertiInput setAddCertificate={setAddCertificate}/>
                }
            </div>
        </div>
    )
}
export default Certification
