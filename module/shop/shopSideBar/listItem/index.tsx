import { ListItem, Text } from '@chakra-ui/react';
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
            id: brand.id,
        });
    };

    return (
        <ListItem display="flex">
            <label
                htmlFor={`${type}.${index}.checked`}
                onChange={() => onClickHandler(index)}
                style={{
                    display: 'flex',
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    paddingBlock: 4,
                    paddingInline: 4,
                }}
            >
                <Text>{brand?.name}</Text>
                <input
                    checked={brand.checked}
                    id={`${type}.${index}.checked`}
                    readOnly
                    type="checkbox"
                />
                <input name={`${type}.${index}.name`} type="hidden" />
                <input name={`${type}.${index}.id`} type="hidden" />
            </label>
        </ListItem>
    );
};

export default Item;
