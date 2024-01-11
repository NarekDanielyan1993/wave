import { Center, Spinner } from '@chakra-ui/react';

const Loader = ({
    fixed,
    margin = 0,
    sizes = 'xl',
    withOverlay = false,
}: {
    fixed?: boolean;
    margin?: number;
    sizes?: string;
    withOverlay?: boolean;
}) => (
    <Center
        alignItems="center"
        bottom={0}
        display="flex"
        justifyContent="center"
        left={0}
        pos="absolute"
        right={0}
        top={0}
        {...(withOverlay && { bg: 'rgba(0, 0, 0, 0.5)' })}
        {...(fixed && {
            position: 'fixed',
            zIndex: 9999,
        })}
        margin={margin}
    >
        <Spinner
            size={sizes}
            speed="0.65s"
            thickness="4px"
            emptyColor="gray.200"
            // color="green.500"
        />
    </Center>
);

export default Loader;
