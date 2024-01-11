import { Box, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { BusinessDetailTypes } from 'types';

const BusinessInfoDetail = ({ text, label, iconName }: BusinessDetailTypes) => (
    <Flex gap={1}>
        <Image alt="text" height={20} src={`/${iconName}.svg`} width={20} />
        <Box>
            <Text ml={0.4} sx={{ color: 'white' }}>
                {label}
            </Text>
            <Text ml={0.4} sx={{ color: 'white' }}>
                {text}
            </Text>
        </Box>
    </Flex>
);

export default BusinessInfoDetail;
