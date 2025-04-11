import {PasswordInput, PasswordInputProps, rem, TextInput, TextInputProps} from "@mantine/core";
import {IconAt, IconLock} from "@tabler/icons-react";

export const InputComponents = {
    TextInput : (props : TextInputProps) => <TextInput {...props} withAsterisk leftSectionPointerEvents={'none'}
                                                       leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
    />,
    PasswordInput: (props : PasswordInputProps) => <PasswordInput {...props} withAsterisk leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}/>
}
