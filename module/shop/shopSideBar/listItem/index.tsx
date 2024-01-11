import { ListItem } from '@chakra-ui/react';
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
    brand: { name: string; checked: boolean };
}) => {
    const onClickHandler = (index: number) => {
        update(index, { name: brand.name, checked: !brand.checked });
    };

    return (
        <ListItem
            alignItems="center"
            cursor="pointer"
            display="flex"
            justifyContent="space-between"
            pl={2}
            pos="relative"
            py={2}
        >
            <label
                htmlFor={`${type}.${index}.name`}
                onClick={() => onClickHandler(index)}
                style={{ flexGrow: 1, display: 'block', cursor: 'pointer' }}
            >
                {brand?.name}
            </label>
            <input
                checked={brand.checked}
                id={`${type}.${index}.name`}
                name={`${type}.${index}.checked`}
                style={{ position: 'absolute', right: 0, zIndex: -1 }}
                type="checkbox"
            />
            <input name={`${type}.${index}.name`} type="hidden" />
        </ListItem>
    );
};

export default Item;
