import {Button} from "@mantine/core";
import OtpBox from "./otpBox.tsx";
import {useDisclosure} from "@mantine/hooks";

interface EmailVerifyBtnCompProps {
    errorsLength: number;
    emailVerified: boolean;
    email: string; // Add email prop
    handleSendOtpClick: () => void
}

const EmailVerifyBtnComp = ({emailVerified, errorsLength, email,  handleSendOtpClick}: EmailVerifyBtnCompProps) => {
    const [opened, {open, close}] = useDisclosure(false);

    const sendOtp = () => {
        open();
        handleSendOtpClick();
    }

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
                    onClick={sendOtp}
                    variant={'filled'}
                >
                    {!emailVerified ? "Verify Email" : "Verified"}
                </Button>

            </div>

            <OtpBox
                opened={opened}
                closeFn={close}
                email={email}
            />
        </>
    )
}
export default EmailVerifyBtnComp
