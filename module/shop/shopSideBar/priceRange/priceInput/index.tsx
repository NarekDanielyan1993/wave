import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { StyledErrorText } from '@components/field/style';
import type { UseFormRegister } from 'react-hook-form';
import type { FilterProductSchemaType } from '../../validationSchema';

const PriceInput = ({
    placeholder,
    register,
    name,
    error,
}: {
    error;
    name: string;
    register: UseFormRegister<FilterProductSchemaType>;
    placeholder: string;
}) => (
    <>
        <InputGroup>
            <InputLeftElement
                color="gray.300"
                fontSize="1.2em"
                pointerEvents="none"
            >
                $
            </InputLeftElement>
            <Input
                {...register(name)}
                placeholder={placeholder}
                type="number"
            />
        </InputGroup>
        <StyledErrorText>{error ?? error}</StyledErrorText>
    </>
);

export default PriceInput;
