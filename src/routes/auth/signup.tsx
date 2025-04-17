import { LoadingOverlay, Button, Checkbox, Anchor } from '@mantine/core'
import { useForm } from '@tanstack/react-form'
import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {DefaultRegisterUserValue, registerFormKeyAndTypes} from '../../types/authType'
import {signupFormValidation} from "../../validators/signupFormValidation.ts";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {registerUser} from "../../service/authService.ts";
import {successNotification} from "../../components/notification/notification.tsx";
import {handleError} from "../../service/errorService.ts";
import {InputComponents} from "../../components/registerInputComponent/inputComponent.tsx";
import EmailVerifyBtnComp from "../../components/authentication/emailVerifyBtnComp.tsx";
import ApplicantRadioBtn from "../../components/authentication/applicantRadioBtn.tsx";

export const Route = createFileRoute('/auth/signup')({
  component: RouteComponent,
})

function RouteComponent() {

  const [emailVerified, setEmailVerified] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: DefaultRegisterUserValue,
    validators: {
      // onMount: signupFormValidation,
      onChange: signupFormValidation,
      onSubmit: signupFormValidation,
    }
  })

  const registerMutation = useMutation({
    mutationFn: async () => registerUser(form.state.values),
    onSuccess: () => {
      successNotification("Registered Successfully", "Redirecting to Login Page");
      navigate({to: "/"}).then()
    },
    onError: (err: unknown) => {
      handleError(err, "Registration Failed");
    }
  })

  const handleFormSubmit = () => {
    console.log(form.state.values);
    registerMutation.mutate();
  }

  return <>
    <LoadingOverlay
        className="translate-x-1/2"
        visible={registerMutation.isPending}
        zIndex={1000}
        overlayProps={{radius: 'sm', blur: 2}}
        loaderProps={{color: 'pink', type: 'bars'}}
    />
    <form onSubmit={(e) => {
      e.preventDefault();
      handleFormSubmit();
    }}
          className={'flex flex-col justify-center gap-3 w-1/2 px-20'}>
      <div className={'text-2xl font-semibold'}>
        Create Account
      </div>
      {registerFormKeyAndTypes.map((data, index) => (
          <form.Field name={data[0]} key={index}>
            {
              (field) => {
                const val = field.state.value;
                const error = field.state.meta.errors[0]?.message;
                const [key, label, placeHolder, component] = data;
                const InputComponent = InputComponents[component];
                return (
                    <>
                      <InputComponent
                          name={key}
                          label={label}
                          placeholder={placeHolder}
                          value={val}
                          onChange={(e) => field.handleChange(e.target.value)}
                          error={error}
                      />

                      {
                          index === 1 && (
                              <EmailVerifyBtnComp
                                  errorsLength={field.state.meta.errors.length}
                                  emailVerified={emailVerified}
                                  email={form.getFieldValue("email")}
                                  setEmailVerified={setEmailVerified}
                              />
                          )
                      }
                    </>

                )
              }
            }
          </form.Field>
      ))}

      <form.Field name={'accountType'}>
        {(field) => (
            <ApplicantRadioBtn value={field.state.value} handleChange={field.handleChange}/>
        )}
      </form.Field>
      <form.Field name={"TermsAndConditions"}>
        {(field) => (
            <Checkbox
                checked={field.state.value}
                onChange={(e) => field.handleChange(e.currentTarget.checked)}
                autoContrast
                label={<>
                  I accept{' '}<Anchor>
                  terms & conditions
                </Anchor>
                </>}
            />
        )}
      </form.Field>

      <form.Subscribe
          selector={(state) => ({
            isValid: state.isFormValid,
            values: state.values
          })}
          children={({ isValid }) => (
              <Button type={"submit"} disabled={!emailVerified || !isValid}
                      className={!emailVerified || form.state.errors.length > 0 ? "!bg-red-500 !text-white" : ``}
                      autoContrast variant={'filled'}>Sign Up</Button>
          )}
      >


      </form.Subscribe>
      <div className={'mx-auto'}>Already have an Account ? &nbsp;
        <span onClick={() => {
          navigate({to: "/auth/login"}).then()
          form.reset();
        }} className={'text-bright-sun-400 hover:underline cursor-pointer'}>
                    Login
                </span>
      </div>
    </form>
  </>
}
