import { LoadingOverlay, TextInput, rem, PasswordInput, Button } from '@mantine/core'
import { IconAt, IconLock } from '@tabler/icons-react'
import { useForm } from '@tanstack/react-form'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { DefaultLoginValue, LoginType } from '../../types/authType'
import { loginFormValidation } from '../../validators/loginFormValidation'
import { useDisclosure } from '@mantine/hooks'
import { useMutation } from '@tanstack/react-query'
import { loginUser } from '../../service/authService'
import { handleError } from '../../service/errorService'
import { successNotification } from '../../components/notification/notification'

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async (user: LoginType) => loginUser(user),
    onSuccess: (data) => {
      successNotification("Login Successfully", "Redirecting to Home Page")
      localStorage.setItem("user", JSON.stringify(data))
      navigate({ to: "/" })
    },
    onError: (err: unknown) => {
      handleError(err, "Login Failed");
    },
    onSettled: () => {
      form.reset()
    },
  })

  const form = useForm({
    defaultValues: DefaultLoginValue,
    validators: {
      onChange: loginFormValidation,
    }
  })
  return <>
    <LoadingOverlay
      visible={isPending}
      zIndex={1000}
      overlayProps={{ radius: 'sm', blur: 2 }}
      loaderProps={{ color: 'bright-sun.4', type: 'bars' }}
    />
    <form onSubmit={(e) => {
      e.preventDefault();
      mutate(form.state.values)
    }} className='flex flex-col justify-center gap-3 w-1/2 px-20'>
      <div className={'text-2xl font-semibold'}>
        Login
      </div>
      <form.Field name='email'>
        {(field) => (
          <TextInput
            name={"email"}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            error={field.state.meta.errors[0]?.message}
            withAsterisk
            leftSectionPointerEvents={'none'}
            leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
            label={"Your Email"}
            placeholder={'Your Email'}
          />
        )}
      </form.Field>
      <form.Field name='password'>
        {(field) => (
          <PasswordInput
            name={"password"}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            error={field.state.meta.errors[0]?.message}
            withAsterisk
            leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
            label={'Password'}
            placeholder={'Password'}
          />
        )}
      </form.Field>
      <Button type='submit' loading={isPending} autoContrast={true} variant={'filled'}>Login</Button>

      <div className={'mx-auto'}>don't have an Account ? &nbsp;
        <span onClick={() => {
          navigate({ to: '/auth' })
        }} className={'text-bright-sun-400 hover:underline cursor-pointer'}>
          SignUp
        </span>
      </div>
      <div onClick={open} className={'text-bright-sun-400 hover:underline cursor-pointer text-center'}>Forgot Password ?</div>
    </form>
    {/* <ResetPassword opened={opened} close={close} /> */}
  </>
}
