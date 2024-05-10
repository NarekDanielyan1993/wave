import { List } from '@chakra-ui/react';
import AccordionWrapper from '@components/accordion';
import type { UseFieldArrayUpdate } from 'react-hook-form';
import Item from '../listItem';
import type { FilterProductSchemaType } from '../validationSchema';

const Frets = ({
    frets,
    update,
}: {
    update: UseFieldArrayUpdate<FilterProductSchemaType>;
    frets: { name: string; checked: boolean; id: string }[];
}) => (
    <AccordionWrapper title="FRETS">
        <List>
            {frets.map((fret, index) => (
                <Item
                    brand={fret}
                    index={index}
                    key={fret.id}
                    type="frets"
                    update={update}
                />
            ))}
        </List>
    </AccordionWrapper>
);

export default Frets;
