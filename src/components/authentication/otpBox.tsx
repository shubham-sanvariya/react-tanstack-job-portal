
import { Button, Modal, PinInput } from "@mantine/core"

import {forwardRef, useImperativeHandle} from "react";
import UseAuthOtp from "../../hooks/useAuthOtp.tsx";

interface OtpBoxProps {
    opened: boolean;
    closeFn: () => void;
    email : string;
}

export interface OtpBoxHandle {
    sendOtp: () => void;
}

const OtpBox = forwardRef<OtpBoxHandle,OtpBoxProps>(({ opened, closeFn,  email }, ref) => {

    const { sendOtpMutation, verifyOtpMutation, interval, seconds } = UseAuthOtp(closeFn);

    const {mutate: sendOtpMutate, isSuccess: isSendOtpSuccess} = sendOtpMutation;

    const {mutate: verifyOtpMutate} = verifyOtpMutation;

    const handleSendOtp = () => {
        sendOtpMutate(email);
    }

    const handleVerifyOtp =  (otp: string) => {
        verifyOtpMutate({otp,email});
    };

    useImperativeHandle(ref, () => ({
        sendOtp: () => {
            console.log("OTP send function called - email:", email);
            if (!email) {
                console.error("No email provided to send OTP");
                return;
            }
            sendOtpMutation.mutate(email);
        }
    }), [email, sendOtpMutation]);

    return (
        <Modal opened={opened} onClose={closeFn} title={"Verify Email"}>
            <div className={'flex flex-col gap-6'}>
                <PinInput className={'mx-auto'} size={"md"} gap={"lg"} length={6} type={"number"}
                    onComplete={handleVerifyOtp}
                />
                {isSendOtpSuccess && <div className={'flex gap-2'}>
                    <Button
                        loading={sendOtpMutation.isPending}
                        disabled={interval.active}
                        fullWidth
                        color={'bright-sun.4'}
                        onClick={handleSendOtp}
                        autoContrast
                        variant={"light"}>
                        {interval.active ? seconds : 'Resend OTP'}
                    </Button>
                </div>}

            </div>
        </Modal>
    )
});

export default OtpBox
