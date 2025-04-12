import {Group, Radio} from "@mantine/core";
import {Updater} from "@tanstack/react-form";

interface ApplicantRadioBtnProps {
    value : string,
    handleChange: (updater: Updater<"APPLICANT" | "EMPLOYER">) => void;
}

const ApplicantRadioBtn = ({ value, handleChange } : ApplicantRadioBtnProps) => {
    return (
        <Radio.Group
            value={value}
            onChange={(changedValue : string) => {
                if (changedValue === "APPLICANT" || changedValue === "EMPLOYER"){
                    handleChange(() => changedValue)
                }
            }}
            label="You are ?"
            withAsterisk
        >
            <Group mt={'xs'}>
                <Radio className="py-4 px-6 border hover:bg-mine-shaft-900 bg-mine-shaft-800 rounded-lg
                     has-[:checked]:bg-bright-sun-400/5 has-[:checked]:border-bright-sun-400" autoContrast value="APPLICANT" label="Applicant" />
                <Radio className="py-4 px-6 border hover:bg-mine-shaft-900
                     has-[:checked]:bg-bright-sun-400/5 bg-mine-shaft-800 rounded-lg has-[:checked]:border-bright-sun-400" autoContrast value="EMPLOYER" label="Employer" />
            </Group>
        </Radio.Group>
    )
}
export default ApplicantRadioBtn
