import { Flex } from '@chakra-ui/react';
import AccordionWrapper from '@components/accordion';
import PriceInput from './priceInput';

const PriceRange = () => (
    <AccordionWrapper title="PRICE RANGE">
        <Flex gap={2} px={2}>
            <PriceInput name="from" placeholder="From" />
            <PriceInput name="to" placeholder="To" />
        </Flex>
    </AccordionWrapper>
);

export default PriceRange;
