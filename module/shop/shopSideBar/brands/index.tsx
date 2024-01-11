import { List } from '@chakra-ui/react';
import AccordionWrapper from '@components/accordion';
import type { UseFieldArrayUpdate } from 'react-hook-form';
import Item from '../listItem';
import type { FilterProductSchemaType } from '../validationSchema';

const Brands = ({
    brands,
    update,
}: {
    update: UseFieldArrayUpdate<FilterProductSchemaType>;
    brands: { name: string; checked: boolean }[];
}) => (
    <AccordionWrapper title="BRANDS">
        <List>
            {brands.map((brand, index) => (
                <Item
                    brand={brand}
                    index={index}
                    key={index}
                    type="brands"
                    update={update}
                />
            ))}
        </List>
    </AccordionWrapper>
);

export default Brands;
