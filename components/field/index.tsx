import 'react-datepicker/dist/react-datepicker.css';
import { Controller, FieldValues } from 'react-hook-form';

import { Box, Checkbox, Select } from '@chakra-ui/react';
import { ChakraFieldDefaultOptions, IFormInputProps } from 'types';
import FileSelect from './fileSelect';
import Input from './input';
import NumericInput from './numericInput';
import {
    StyledErrorText,
    StyledFormControl,
    StyledFormLabel,
    StyledInput,
    StyledLabel,
    StyledSelect,
} from './style';

const FormInput = <T extends FieldValues>({
    control,
    name,
    label,
    type = 'text',
    error,
    options,
    views,
    disabled,
}: IFormInputProps<T>): JSX.Element => {
    const defaultOptions: ChakraFieldDefaultOptions<T> = {
        isInvalid: !!error,
        size: 'md',
        type,
        label,
        views,
        disabled,
        name,
    };

    switch (type) {
        case 'select':
            return (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange } }) => (
                        <StyledSelect>
                            <Select
                                onChange={val => onChange(val)}
                                {...defaultOptions}
                            >
                                {options?.map(option => (
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </Select>
                        </StyledSelect>
                    )}
                />
            );
        case 'file':
            return (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, name, value } }) => (
                        <FileSelect onChange={e => onChange(e)} value={value} />
                    )}
                />
            );
        case 'textarea':
            return (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { value, onChange } }) => (
                        <>
                            <StyledFormControl>
                                <StyledInput
                                    as="textarea"
                                    onChange={onChange}
                                    p={4}
                                    placeholder=" "
                                    resize="none"
                                    rows={4}
                                    value={value}
                                    {...defaultOptions}
                                />
                                <StyledLabel htmlFor={name}>
                                    {defaultOptions.label}
                                </StyledLabel>
                                <StyledErrorText>
                                    {defaultOptions.isInvalid && error}
                                </StyledErrorText>
                            </StyledFormControl>
                        </>
                    )}
                />
            );
        case 'checkbox':
            return (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { value, onChange } }) => (
                        <>
                            <Checkbox
                                colorScheme="blue"
                                isChecked={value}
                                onChange={onChange}
                                {...defaultOptions}
                            >
                                {label}
                            </Checkbox>
                            <StyledErrorText>
                                {defaultOptions.isInvalid && error}
                            </StyledErrorText>
                        </>
                    )}
                />
            );
        case 'password': {
            return (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <StyledFormControl>
                                <Box pos="relative">
                                    <StyledInput
                                        onChange={onChange}
                                        placeholder=" "
                                        value={value}
                                        {...defaultOptions}
                                    />
                                    <StyledFormLabel htmlFor={name}>
                                        {defaultOptions.label}
                                    </StyledFormLabel>
                                </Box>
                                <StyledErrorText>
                                    {defaultOptions.isInvalid && error}
                                </StyledErrorText>
                            </StyledFormControl>
                        </>
                    )}
                />
            );
        }
        case 'number': {
            return (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <StyledFormControl>
                                <Box pos="relative">
                                    <NumericInput
                                        {...defaultOptions}
                                        isInvalid={!!error}
                                        onChange={onChange}
                                        placeholder=" "
                                        value={value}
                                    />
                                    <StyledFormLabel htmlFor={name}>
                                        {defaultOptions.label}
                                    </StyledFormLabel>
                                </Box>
                                <StyledErrorText>
                                    {defaultOptions.isInvalid && error}
                                </StyledErrorText>
                            </StyledFormControl>
                        </>
                    )}
                />
            );
        }
        default:
            return (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <Input
                                error={error}
                                isDisabled={!!defaultOptions.disabled}
                                isInvalid={defaultOptions.isInvalid}
                                label={defaultOptions.label}
                                name={name}
                                onChange={onChange}
                                value={value}
                            />
                        </>
                    )}
                />
            );
    }
};

export default FormInput;
