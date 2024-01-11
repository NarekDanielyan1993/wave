import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Text,
} from '@chakra-ui/react';

const AccordionWrapper = ({
    children,
    title,
}: {
    title: string;
    children: React.ReactNode;
}) => (
    <Accordion allowToggle>
        <AccordionItem bgColor="transparent" border="none">
            <AccordionButton
                _hover={{ bgColor: 'transparent' }}
                sx={{ border: 'none' }}
            >
                <Text flex="1" textAlign="left">
                    {title}
                </Text>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>{children}</AccordionPanel>
        </AccordionItem>
    </Accordion>
);

export default AccordionWrapper;
