import {useMutation} from "@tanstack/react-query";
import {sendOtp, verifyOtp} from "../service/authService.ts";
import {successNotification} from "../components/notification/notification.tsx";
import {handleError} from "../service/errorService.ts";
import {useCallback, useEffect, useState} from "react";

const UseAuthOtp = (close? : () => void ) => {
    const OTP_RESEND_INTERVAL = 60
    const [seconds, setSeconds] = useState(OTP_RESEND_INTERVAL);
    const [isRunning, setIsRunning] = useState(false); // Start paused by default

    // Stable interval implementation
    useEffect(() => {
        if (!isRunning) return;

        const timer = setInterval(() => {
            setSeconds(prev => (prev <= 1 ? OTP_RESEND_INTERVAL : prev - 1));
        }, 1000);

        return () => clearInterval(timer);
    }, [isRunning, OTP_RESEND_INTERVAL]);

    const resetInterval = useCallback(() => {
        setIsRunning(true);
        setSeconds(OTP_RESEND_INTERVAL);
    }, [OTP_RESEND_INTERVAL]);


    const verifyOtpMutation = useMutation({
        mutationFn: async (props : {otp: string, email: string}) => verifyOtp(props.email, props.otp),
        onSuccess: () => {
            successNotification("OTP verified", "Email Verified Successfully");
           if (close) close();
        },
        onError: (err : unknown) => {
            handleError(err, "OTP verification failed")
        }
    })

    const sendOtpMutation  = useMutation({
        mutationFn: async (email : string) => sendOtp(email,"register"),
        onSuccess: () => {
            setIsRunning(true);
            successNotification('OTP sent successfully', 'Enter OTP to verify email.')
        },
        onError: (err : unknown) => {
            if (close) close();
            handleError(err, "Failed To Send OTP")
        }
    })

    return { sendOtpMutation, verifyOtpMutation, isRunning, seconds, resetInterval }
}
export default UseAuthOtp
