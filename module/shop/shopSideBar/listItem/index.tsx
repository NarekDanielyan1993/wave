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
    brand: { name: string; checked: boolean };
}) => {
    const onClickHandler = (index: number) => {
        update(index, {
            name: brand.name,
            checked: !brand.checked,
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
                    readOnly
                    id={`${type}.${index}.checked`}
                    type="checkbox"
                />
                <input name={`${type}.${index}.name`} type="hidden" />
            </label>
        </ListItem>
    );
};

export default Item;
