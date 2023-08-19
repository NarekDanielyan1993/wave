import { Checkbox, Switch, useTheme } from '@chakra-ui/react';
import { ALLOWED_FILE_TYPES } from 'constant';
import { FC } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller } from 'react-hook-form';

import { IFormInputProps } from 'types';
import {
    StyledErrorText,
    StyledFileInput,
    StyledInput,
    StyledSelect,
} from './style';

const FormInput: FC<IFormInputProps> = ({
    control,
    name,
    label,
    type = 'text',
    error,
    defaultValue,
    options,
    views,
    format: dateFormat,
}): JSX.Element => {
    const theme = useTheme();
    const defaultOptions: Omit<IFormInputProps, 'name'> = {
        defaultValue,
        isInvalid: !!error,
        size: 'sm',
        type,
        label,
    };

    switch (type) {
        case 'switch':
            return (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { value, onChange } }) => (
                        <Switch
                            isChecked={value}
                            {...defaultOptions}
                            onChange={onChange}
                        />
                    )}
                />
            );
        case 'select':
            return (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { value, onChange } }) => (
                        <StyledSelect
                            onChange={onChange}
                            options={options}
                            value={value}
                        />
                    )}
                />
            );
        case 'multiple-select':
            return (
                <Controller
                    control={control}
                    defaultValue={defaultValue}
                    name={name}
                    render={({ field: { onChange, value } }) => (
                        <StyledSelect
                            isMulti
                            onChange={onChange}
                            options={options}
                            value={value}
                        />
                    )}
                />
            );
        case 'custom-date':
            return (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { value, onChange } }) => (
                        <ReactDatePicker
                            className="date-picker"
                            dateFormat={dateFormat}
                            onChange={onChange}
                            selected={value}
                            wrapperClassName="date-picker-wrapper"
                        />
                    )}
                />
            );
        case 'file':
            return (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange } }) => (
                        <>
                            <StyledFileInput
                                accept={ALLOWED_FILE_TYPES}
                                onChange={e => {
                                    const target = e.target as HTMLInputElement;
                                    const file = (target.files as FileList)[0];
                                    onChange(file);
                                }}
                            />
                            {error && <p color="red">{error}</p>}
                        </>
                    )}
                />
            );
        case 'textarea':
            return (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { value, onChange } }) => (
                        <StyledInput
                            as="textarea"
                            onChange={onChange}
                            value={value}
                            {...defaultOptions}
                        />
                    )}
                />
            );
        case 'checkbox':
            return (
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { value, onChange } }) => (
                        <Checkbox
                            isChecked={value}
                            onChange={onChange}
                            {...defaultOptions}
                        >
                            {label}
                        </Checkbox>
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
                            <StyledInput
                                onChange={onChange}
                                type="password"
                                value={value}
                                {...defaultOptions}
                            />
                            <StyledErrorText>
                                {defaultOptions.isInvalid && error}
                            </StyledErrorText>
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
                        <StyledInput
                            errorBorderColor={theme.palette.error}
                            onChange={onChange}
                            value={value}
                            {...defaultOptions}
                        />
                    )}
                />
            );
    }
};

export default FormInput;
