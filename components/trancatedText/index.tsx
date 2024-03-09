import { Box, Button } from '@chakra-ui/react';
import { useTruncateText } from '@hooks/useTruncatedText';
import { MouseEvent } from 'react';

const TruncatedText = ({ text }: { text: string }) => {
    const { truncatedText, isExpanded, shouldTruncate, handleExpand } =
        useTruncateText(text);

    const textExpandHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        handleExpand();
    };
    return (
        <Box>
            {truncatedText}
            {'      '}
            {shouldTruncate && (
                <Button onClick={textExpandHandler} variant="truncate">
                    {isExpanded ? 'show less' : 'show more'}
                </Button>
            )}
        </Box>
    );
};

export default TruncatedText;
