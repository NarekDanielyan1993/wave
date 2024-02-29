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
            htmlFor={`${type}.${index}.name`}
            onChange={() => onClickHandler(index)}
            style={{
                display: 'flex',
                flexGrow: 1,
                justifyContent: 'space-between',
                cursor: 'pointer',
                padding: 4,
            }}
        >
            <Text>{brand.name}</Text>
            <input
                style={{ cursor: 'pointer' }}
                checked={brand.checked}
                id={`${type}.${index}.name`}
                type="checkbox"
                readOnly
            />
            <input name={`${type}.${index}.checked`} type="hidden" />
        </label>
    );
};

export default Item;
