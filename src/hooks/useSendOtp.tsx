import {useMutation} from "@tanstack/react-query";
import {sendOtp, verifyOtp} from "../service/authService.ts";
import {successNotification} from "../components/notification/notification.tsx";
import {handleError} from "../service/errorService.ts";
import {useInterval} from "@mantine/hooks";
import {useState} from "react";

const UseSendOtp = ( close : () => void ) => {
    const OTP_RESEND_INTERVAL = 60
    const [seconds, setSeconds] = useState(OTP_RESEND_INTERVAL);

    const interval = useInterval(() => {
        if (seconds === 0) {
            setSeconds(OTP_RESEND_INTERVAL)
            interval.stop()
        } else {
            setSeconds((s) => s - 1)
        }
    }, 1000)

    const resetInterval = () => {
        interval.stop();
        setSeconds(OTP_RESEND_INTERVAL);
    }

    const verifyOtpMutation = useMutation({
        mutationFn: async (props : {otp: string, email: string}) => verifyOtp(props.email, props.otp),
        onSuccess: () => {
            successNotification("OTP verified", "Email Verified Successfully");
            close();
        },
        onError: (err : unknown) => {
            handleError(err, "OTP verification failed")
        }
    })

    const sendOtpMutation  = useMutation({
        mutationFn: async (email : string) => sendOtp(email,"register"),
        onSuccess: () => {
            interval.start()
            successNotification('OTP sent successfully', 'Enter OTP to verify email.')
        },
        onError: (err : unknown) => {
            close();
            handleError(err, "Failed To Send OTP")
        }
    })

    return { sendOtpMutation, verifyOtpMutation, interval, seconds, resetInterval }
}
export default UseSendOtp
