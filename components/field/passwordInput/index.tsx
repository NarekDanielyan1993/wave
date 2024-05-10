import { InputGroup, InputRightElement } from '@chakra-ui/react';
import IconButton from '@components/button/icon-button';
import useToggle from '@hooks/useToggle';
import { Controller, useFormContext } from 'react-hook-form';
import { ITextFieldProps } from 'types';
import {
    StyledErrorText,
    StyledFormControl,
    StyledFormLabel,
    StyledInput,
} from '../style';

// eslint-disable-next-line react/function-component-definition
function PasswordField<T>({
    label,
    name,
    disabled,
    ...props
}: ITextFieldProps<T>) {
    const { value: passwordToggle, toggle } = useToggle(false);

    const togglePasswordHandler = () => {
        toggle();
    };
    const { control, formState } = useFormContext();
    const errorMessage = formState.errors[name]
        ? (formState.errors[name]?.message as string)
        : null;

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
                <StyledFormControl>
                    <InputGroup>
                        <StyledInput
                            aria-label={label}
                            id={name}
                            isDisabled={disabled}
                            isInvalid={!!errorMessage}
                            name={name}
                            onChange={onChange}
                            placeholder=" "
                            type={passwordToggle ? 'text' : 'password'}
                            value={value}
                            {...props}
                        />
                        <StyledFormLabel htmlFor={name}>
                            {label}
                        </StyledFormLabel>
                        <InputRightElement onClick={togglePasswordHandler}>
                            {passwordToggle ? (
                                <IconButton
                                    aria-label="show-password"
                                    color="black"
                                    iconName="view"
                                />
                            ) : (
                                <IconButton
                                    aria-label="hide-password"
                                    color="black"
                                    iconName="viewOff"
                                />
                            )}
                        </InputRightElement>
                    </InputGroup>
                    <StyledErrorText>{errorMessage}</StyledErrorText>
                </StyledFormControl>
            )}
        />
    );
}

export default PasswordField;
