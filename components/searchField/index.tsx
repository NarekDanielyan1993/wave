import {
    StyledErrorText,
    StyledFormControl,
    StyledFormLabel,
    StyledInput,
} from '@components/field/style';
import { Controller } from 'react-hook-form';

const FormSearchInput = ({
    control,
    dispatchFn,
    name,
    label,
    options,
    error,
}) => (
    <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
            <>
                <StyledFormControl>
                    <StyledInput
                        {...options}
                        aria-label={label}
                        onChange={e => {
                            onChange(e);
                            dispatchFn(e);
                        }}
                        value={value}
                    />
                    <StyledFormLabel htmlFor={name}>{label}</StyledFormLabel>
                    <StyledErrorText>{!!error && error}</StyledErrorText>
                </StyledFormControl>
            </>
        )}
    />
);

export default FormSearchInput;
