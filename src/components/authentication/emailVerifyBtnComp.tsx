import {Button} from "@mantine/core";

interface EmailVerifyBtnCompProps {
    handleSendOtp: () => void,
    errorsLength: number,
    emailLength: number,
    emailVerified: boolean
}

const EmailVerifyBtnComp = ( { emailVerified,handleSendOtp,errorsLength,emailLength } : EmailVerifyBtnCompProps ) => {
    return (
        <div>
            <Button
                disabled={errorsLength > 0 || emailLength === 0}
                className={
                    !emailVerified
                        ? `!bg-blue-500 !text-white py-2 px-4 rounded hover:!bg-blue-600`
                        : `!bg-green-500 text-white py-2 px-4 rounded hover:!bg-green-600`
                }
                onClick={handleSendOtp}
                variant={'filled'}
            >
                {!emailVerified ? "Verify Email" : "Verified"}
            </Button>

        </div>
    )
}
export default EmailVerifyBtnComp
