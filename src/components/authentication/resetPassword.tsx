import {Button, Modal, PasswordInput, PinInput, rem, TextInput} from '@mantine/core'
import {IconAt, IconLock} from '@tabler/icons-react'
import {useForm} from "@tanstack/react-form";
import {loginFormValidation} from "../../validators/loginFormValidation.ts";
import {DefaultLoginValue} from "../../types/authType.ts";
import {useMutation} from "@tanstack/react-query";
import {changePassword} from "../../service/userService.ts";
import {successNotification} from "../notification/notification.tsx";
import {handleError} from "../../service/errorService.ts";
import UseAuthOtp from "../../hooks/useAuthOtp.tsx";

interface ResetPasswordProps {
    opened: boolean;
    close: () => void;
}

const ResetPassword = ({opened, close}: ResetPasswordProps) => {

    const form = useForm({
        defaultValues: DefaultLoginValue,
        validators: {
            onChange: loginFormValidation
        }
    })

    const {sendOtpMutation, verifyOtpMutation, interval, seconds, resetInterval} = UseAuthOtp(close);

    const {mutate: sendOtpMutate, isPending: isSendOtpPending, isSuccess: isSendOtpSuccess} = sendOtpMutation;

    const {mutate: verifyOtpMutate, isSuccess: isVerifyOtpSuccess} = verifyOtpMutation;

    const handleSendOtp = () => {
        sendOtpMutate(form.getFieldValue("email"))
    }

    const handleVerifyOtp = (otp: string) => {
        const email = form.getFieldValue("email");
        verifyOtpMutate({email, otp});
    }

    function resendOtp() {
        handleSendOtp();
    }

    const changeEmail = () => {
        resetInterval();
    }

    const changePasswordMutate = useMutation({

        onMutate: async () => changePassword(form.state.values.email, form.state.values.password),
        onSuccess: () => {
            successNotification("Password Changed", "Login with new password");
            form.reset();
            close();
        },
        onError: (err: unknown) => {
            handleError(err, "Password Reset Failed");
        }
    })

    const handleChangePassword = () => {
        changePasswordMutate.mutate();
    }

    return (
        <Modal opened={opened} onClose={close} title={"Reset Password"}>
            <form className={'flex flex-col gap-6'}>
                <form.Field name={"email"}>
                    {
                        (field) => (
                            <TextInput
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                leftSection={<IconAt size={16}/>}
                                label={"Email"}
                                withAsterisk
                                placeholder="Your email"
                                rightSectionWidth={"xl"}
                                rightSection={<Button
                                    loading={isSendOtpPending && !isSendOtpSuccess}
                                    size={"xs"} className={'mr-1'} onClick={handleSendOtp} autoContrast={true}
                                    disabled={field.state.value === "" || isSendOtpSuccess} variant={"filled"}>
                                    Send OTP
                                </Button>}
                            />
                        )
                    }
                </form.Field>
                {isSendOtpSuccess && (
                    <PinInput className={'mx-auto'} size={"md"} gap={"lg"} length={6} type={"number"}
                              onComplete={handleVerifyOtp}
                    />)}
                {isSendOtpSuccess && <div className={'flex gap-2'}>
                    <Button
                        loading={isSendOtpPending}
                        disabled={interval.active}
                        fullWidth
                        color={'bright-sun.4'}
                        onClick={resendOtp} autoContrast
                        variant={"light"}>
                        {interval.active ? seconds : 'Resend OTP'}
                    </Button>
                    <Button
                        onClick={changeEmail}
                        autoContrast
                        fullWidth
                        variant={"filled"}>
                        Change Email
                    </Button>
                </div>}

                {isVerifyOtpSuccess && <form.Field name={"password"}>
                    {
                        (field) => (
                            <PasswordInput
                                name={"password"}
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                error={field.state.meta.errors[0]?.message}
                                withAsterisk
                                leftSection={<IconLock style={{width: rem(18), height: rem(18)}} stroke={1.5}/>}
                                label={'Password'}
                                placeholder={'Password'}
                            />
                        )
                    }
                </form.Field>}
                {isVerifyOtpSuccess
                    && <Button
                        onClick={handleChangePassword}
                        autoContrast
                        variant={"filled"}>
                        Change Password
                    </Button>}
            </form>
        </Modal>
    )
}
export default ResetPassword
