
import { Button, Modal, PinInput } from "@mantine/core"

import { successNotification } from "../notification/notification";
import {sendOtp, verifyOtp} from "../../service/authService";
import {useInterval} from "@mantine/hooks";
import {useState, forwardRef, useImperativeHandle} from "react";
import {useMutation} from "@tanstack/react-query";
import {handleError} from "../../service/errorService.ts";

interface OtpBoxProps {
    opened: boolean;
    closeFn: () => void;
    email : string;
    setEmailVerified : React.Dispatch<React.SetStateAction<boolean>>
}

export interface OtpBoxHandle {
    sendOtp: () => void;
}

const OtpBox = forwardRef<OtpBoxHandle,OtpBoxProps>(({ opened, closeFn,  email, setEmailVerified }, ref) => {
    const OTP_RESEND_INTERVAL = 60
    const [otpSent, setOtpSent] = useState(false)
    const [seconds, setSeconds] = useState(OTP_RESEND_INTERVAL)

    const interval = useInterval(() => {
        if (seconds === 0) {
            setSeconds(OTP_RESEND_INTERVAL)
            interval.stop()
        } else {
            setSeconds((s) => s - 1)
        }
    }, 1000)

    const sendOtpMutation  = useMutation({
       onMutate: async (email : string) => sendOtp(email, "register"),
        onSuccess: () => {
            setOtpSent(true)
            interval.start()
            successNotification('OTP sent successfully', 'Enter OTP to verify email.')
        },
        onError: (err : unknown) => {
           handleError(err, "Failed To Send OTP")
        }
    });

    const handleSendOtp = () => {
        sendOtpMutation.mutate(email);
    }

    useImperativeHandle(ref, () => ({
        sendOtp: handleSendOtp
    }))


    const verifyOtpMutation = useMutation({
        mutationFn: async (otp : string) => verifyOtp(email, otp),
        onSuccess: () => {
            setEmailVerified(true);
            successNotification("OTP verified", "Email Verified Successfully");
            closeFn();
        },
        onError: (err : unknown) => {
            handleError(err, "OTP verification failed")
        }
    })

    const handleVerifyOtp =  (otp: string) => {
        verifyOtpMutation.mutate(otp);
    };

    return (
        <Modal opened={opened} onClose={closeFn} title={"Verify Email"}>
            <div className={'flex flex-col gap-6'}>
                <PinInput className={'mx-auto'} size={"md"} gap={"lg"} length={6} type={"number"}
                    onComplete={handleVerifyOtp}
                />
                {otpSent && <div className={'flex gap-2'}>
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
