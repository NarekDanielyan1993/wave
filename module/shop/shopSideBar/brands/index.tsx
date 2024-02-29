import AccordionWrapper from '@components/accordion';
import type { UseFieldArrayUpdate } from 'react-hook-form';
import Item from '../listItem';
import type { FilterProductSchemaType } from '../validationSchema';

const Brands = ({
    brands,
    update,
}: {
    update: UseFieldArrayUpdate<FilterProductSchemaType>;
    brands: { name: string; checked: boolean; id: string }[];
}) => (
    <AccordionWrapper title="BRANDS">
        <div>
            {brands.map((brand, index) => (
                <Item
                    brand={brand}
                    index={index}
                    key={brand.id}
                    type="brands"
                    update={update}
                />
            ))}
        </div>
    </AccordionWrapper>
);

export default Brands;
