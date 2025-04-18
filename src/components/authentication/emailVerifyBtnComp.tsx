import {Button} from "@mantine/core";
import {useRef} from "react";
import OtpBox, {OtpBoxHandle} from "./otpBox.tsx";
import {useDisclosure} from "@mantine/hooks";

interface EmailVerifyBtnCompProps {
    errorsLength: number;
    emailVerified: boolean;
    email: string; // Add email prop
}

const EmailVerifyBtnComp = ({emailVerified, errorsLength, email}: EmailVerifyBtnCompProps) => {
    const otpBoxRef = useRef<OtpBoxHandle>(null);
    const [opened, { open, close }] = useDisclosure(false);

    const handleSendOtpClick = () => {
        if (otpBoxRef.current) {
            open();
            otpBoxRef.current?.sendOtp();
        }
    };
    return (
        <>
            <div>
                <Button
                    disabled={errorsLength > 0 || email.length === 0}
                    className={
                        !emailVerified
                            ? `!bg-blue-500 !text-white py-2 px-4 rounded hover:!bg-blue-600`
                            : `!bg-green-500 !text-white py-2 px-4 rounded hover:!bg-green-600`
                    }
                    onClick={handleSendOtpClick}
                    variant={'filled'}
                >
                    {!emailVerified ? "Verify Email" : "Verified"}
                </Button>

            </div>

            <OtpBox
                ref={otpBoxRef}
                opened={opened}
                closeFn={close}
                email={email}
            />
        </>
    )
}
export default EmailVerifyBtnComp
