import { Box, Button } from '@chakra-ui/react';
import { useTruncateText } from '@hooks/useTruncatedText';

const TruncatedText = ({ text }: { text: string }) => {
    const { truncatedText, isExpanded, shouldTruncate, handleExpand } =
        useTruncateText(text);

    return (
        <Box>
            {truncatedText}
            {'      '}
            {shouldTruncate && (
                <Button onClick={handleExpand} variant="truncate">
                    {isExpanded ? 'show less' : 'show more'}
                </Button>
            )}
        </Box>
    );
};

export default TruncatedText;
