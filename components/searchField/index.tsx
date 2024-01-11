import {
    StyledErrorText,
    StyledFormControl,
    StyledInput,
} from '@components/field/style';
import { useAppDispatch } from '@store/create-store';
import { Controller, useWatch } from 'react-hook-form';

const FormSearchInput = ({
    control,
    dispatchFn,
    name,
    label,
    options,
    error,
}) => {
    const dispatch = useAppDispatch();
    const field = useWatch({ control, name });
    return (
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
                        <StyledErrorText>{!!error && error}</StyledErrorText>
                    </StyledFormControl>
                </>
            )}
        />
    );
};

export default FormSearchInput;
