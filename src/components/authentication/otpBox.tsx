
import { Button, Modal, PinInput } from "@mantine/core"

import UseAuthOtp from "../../hooks/useAuthOtp.tsx";

interface OtpBoxProps {
    opened: boolean;
    closeFn: () => void;
    email : string;
}

const OtpBox = ({ opened, closeFn,  email } : OtpBoxProps) => {

    const { sendOtpMutation, verifyOtpMutation, isRunning, seconds } = UseAuthOtp(closeFn);

    const {mutate: sendOtpMutate, isSuccess: isSendOtpSuccess} = sendOtpMutation;

    const {mutate: verifyOtpMutate} = verifyOtpMutation;

    const handleSendOtp = () => {
        sendOtpMutate(email);
    }

    const handleVerifyOtp =  (otp: string) => {
        verifyOtpMutate({otp,email});
    };

    return (
        <Modal opened={opened} onClose={closeFn} title={"Verify Email"}>
            <div className={'flex flex-col gap-6'}>
                <PinInput className={'mx-auto'} size={"md"} gap={"lg"} length={6} type={"number"}
                    onComplete={handleVerifyOtp}
                />
                {isSendOtpSuccess && <div className={'flex gap-2'}>
                    <Button
                        loading={sendOtpMutation.isPending}
                        disabled={isRunning}
                        fullWidth
                        color={'bright-sun.4'}
                        onClick={handleSendOtp}
                        autoContrast
                        variant={"light"}>
                        {isRunning ? seconds : 'Resend OTP'}
                    </Button>
                </div>}

            </div>
        </Modal>
    )
}

export default OtpBox
