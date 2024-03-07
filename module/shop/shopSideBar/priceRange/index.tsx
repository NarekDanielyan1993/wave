import { Flex } from '@chakra-ui/react';
import AccordionWrapper from '@components/accordion';
import type { UseFormRegister } from 'react-hook-form';
import type { FilterProductSchemaType } from '../validationSchema';
import PriceInput from './priceInput';

const PriceRange = ({
    register,
    errors,
}: {
    errors;
    register: UseFormRegister<FilterProductSchemaType>;
}) => (
    <AccordionWrapper title="PRICE RANGE">
        <Flex flexWrap="wrap" gap={2} px={2}>
            <PriceInput
                error={errors?.from?.message}
                name="from"
                placeholder="From"
                register={register}
            />
            <PriceInput
                error={errors?.to?.message}
                name="to"
                placeholder="To"
                register={register}
            />
        </Flex>
    </AccordionWrapper>
);

export default PriceRange;
