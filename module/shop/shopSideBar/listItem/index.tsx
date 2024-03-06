import { Text } from '@chakra-ui/react';
import type { UseFieldArrayUpdate } from 'react-hook-form';
import type { FilterProductSchemaType } from '../validationSchema';

const Item = ({
    brand,
    type,
    index,
    update,
}: {
    type: string;
    update: UseFieldArrayUpdate<FilterProductSchemaType>;
    index: number;
    brand: { name: string; checked: boolean; id: string };
}) => {
    const onClickHandler = (index: number) => {
        update(index, {
            name: brand.name,
            checked: !brand.checked,
        });
    };

    return (
        <label
            onChange={() => onClickHandler(index)}
            style={{
                display: 'flex',
                flexGrow: 1,
                justifyContent: 'space-between',
                cursor: 'pointer',
                padding: 8,
            }}
        >
            <Text>{brand.name}</Text>
            <input
                checked={brand.checked}
                style={{ cursor: 'pointer' }}
                type="checkbox"
            />
            <input name={`${type}.${index}.checked`} type="hidden" />
        </label>
    );
};

export default Item;
