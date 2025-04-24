import {Button} from "@mantine/core";
import {useState} from "react";
import useProfile from "../../hooks/useProfile.tsx";
import {ExperienceType, ProfileType} from "../../types/profileType.ts";
import {successNotification} from "../notification/notification.tsx";
import {formatDate} from "../utils/utility.ts";
import ExpInput from "./expInput.tsx";


const ExpCard = (props : any) => {

    const [edit, setEdit] = useState(false);
    const {profile: profileState, updateProfileMutate} = useProfile();

    const handleDelete = () => {
        const exp : ExperienceType[] | [] = [...(profileState?.experiences || [] )];

        exp.splice(props.index, 1);
        const updatedProfile = {...profileState, experiences : exp};
        setEdit(false);
        updateProfileMutate(updatedProfile as ProfileType);
        successNotification("Success", `Experience Deleted Successfully`);
    }

    return !edit ? (
        <div className={'flex flex-col gap-2'}>
            <div className={'flex justify-between'}>
                <div className={'flex items-center gap-2'}>
                    <div className={'p-2 bg-mine-shaft-800 rounded-md'}><img className={'h-7'} src={`/assets/Icons/${props.company}.png`} alt="microsoft"/></div>
                    <div className={'flex flex-col'}>
                        <div className={'font-semibold'}>{props.title}</div>
                        <div className={'text-sm text-mine-shaft-300'}>{props.company} &bull; {props.location}</div>
                    </div>
                </div>
                <div className={'text-sm text-mine-shaft-300'}>
                    {formatDate(props.startDate)} - {props.working ? "Present": formatDate(props.endDate)}
                </div>
            </div>
            <div className={'text-sm text-mine-shaft-300 text-justify xs-mx:text-xs'}>
                {props.description}
            </div>
            {props.edit && <div className="flex gap-5">
                <Button onClick={() => setEdit(true)}
                    color={'bright-sun.4'} variant={"outline"}>Edit</Button>
                <Button
                    color={'red.8'} onClick={handleDelete} variant={"light"}>Delete</Button>
            </div>}
        </div>
    ) : <ExpInput {...props} setEdit={setEdit}/>
}
export default ExpCard
