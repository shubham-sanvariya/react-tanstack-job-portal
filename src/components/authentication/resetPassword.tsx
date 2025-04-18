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

import React, {useCallback, useMemo} from 'react';
import {isValid} from "zod";

interface ResetPasswordProps {
    opened: boolean;
    close: () => void;
}

const ResetPassword = React.memo(({ opened, close }: ResetPasswordProps) => {
    const form = useForm({
        defaultValues: DefaultLoginValue,
        validators: {
            onChange: loginFormValidation
        }
    })

    const changePasswordMutate = useMutation({
        mutationFn: () => changePassword(formValues.email, formValues.password),
        onSuccess: () => {
            successNotification("Password Changed", "Login with new password");
            form.reset();
            close();
        },
        onError: (err: unknown) => {
            handleError(err, "Password Reset Failed");
        }
    });

    const formValues = useMemo(() => ({
        email: form.getFieldValue("email"),
        password: form.getFieldValue("password")
    }), [form]);

    const {sendOtpMutation, isRunning, verifyOtpMutation, seconds, resetInterval} = UseAuthOtp(close);

    const handleSendOtp = () => {
        sendOtpMutation.mutate(formValues.email)
    }

    const handleVerifyOtp = (otp: string) => {
        verifyOtpMutation.mutate({otp, email: formValues.email});
    }

    const resendOtp = () => {
        handleSendOtp();
    }

    const changeEmail = () => {
        resetInterval();
    }

    const handleChangePassword = useCallback(() => {
        changePasswordMutate.mutate();
    }, [changePasswordMutate]);

    return (
        <Modal opened={opened} onClose={close} title={"Reset Password"}>
            <form className={'flex flex-col gap-6'}>
                <form.Field name={"email"}>
                    {(field) => (
                        <TextInput
                            value={field.state.value || ''}
                            onChange={(e) => field.handleChange(e.target.value)}
                            leftSection={<IconAt size={16}/>}
                            label={"Email"}
                            withAsterisk
                            placeholder="Your email"
                            rightSectionWidth={"xl"}
                            rightSection={
                                <Button
                                    loading={sendOtpMutation.isPending}
                                    size={"xs"}
                                    className={'mr-1'}
                                    onClick={handleSendOtp}
                                    autoContrast
                                    disabled={!field.state.value || sendOtpMutation.isSuccess}
                                    variant={"filled"}
                                >
                                    {sendOtpMutation.isSuccess ? 'Sent' : 'Send OTP'}
                                </Button>
                            }
                        />
                    )}
                </form.Field>

                {sendOtpMutation.isSuccess && (
                    <>
                        <PinInput
                            className={'mx-auto'}
                            size={"md"}
                            gap={"lg"}
                            length={6}
                            type={"number"}
                            onComplete={handleVerifyOtp}
                        />
                        <div className={'flex gap-2'}>
                            <Button
                                loading={sendOtpMutation.isPending}
                                disabled={isRunning}
                                fullWidth
                                color={'bright-sun.4'}
                                onClick={resendOtp}
                                autoContrast
                                variant={"light"}
                            >
                                {isRunning ? seconds : 'Resend OTP'}
                            </Button>
                            <Button
                                onClick={changeEmail}
                                autoContrast
                                fullWidth
                                variant={"filled"}
                            >
                                Change Email
                            </Button>
                        </div>
                    </>
                )}

                {verifyOtpMutation.isSuccess && (
                    <>
                        <form.Field name={"password"}>
                            {(field) => (
                                <PasswordInput
                                    value={field.state.value || ''}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    error={field.state.meta.errors[0]?.message || ''}
                                    withAsterisk
                                    leftSection={<IconLock style={{width: rem(18), height: rem(18)}} stroke={1.5}/>}
                                    label={'Password'}
                                    placeholder={'Password'}
                                />
                            )}
                        </form.Field>
                        <form.Subscribe selector={(state) => ({
                            isValid: state.isFormValid,
                            values: state.values
                        })}>
                            <Button
                                onClick={handleChangePassword}
                                loading={changePasswordMutate.isPending}
                                autoContrast
                                variant={"filled"}
                                disabled={!isValid}
                            >
                                Change Password
                            </Button>
                        </form.Subscribe>
                    </>
                )}
            </form>
        </Modal>
    );
});

export default ResetPassword;
