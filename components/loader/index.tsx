import { Center, Spinner } from '@chakra-ui/react';

const Loader = () => (
    <Center
        bg="rgba(0, 0, 0, 0.5)"
        bottom={0}
        left={0}
        position="fixed"
        right={0}
        top={0}
        zIndex={9999}
    >
        <Spinner
            color="green.500"
            emptyColor="gray.200"
            size="xl"
            speed="0.65s"
            thickness="4px"
        />
    </Center>
);

export default Loader;
