import Button from '@components/button';
import { useTruncateText } from '@hooks/useTruncatedText';

const TruncatedText = ({ text }: { text: string }) => {
    const { truncatedText, isExpanded, shouldTruncate, handleExpand } =
        useTruncateText(text);

    return (
        <>
            {truncatedText}
            {shouldTruncate && (
                <Button onClick={handleExpand} renderAs="truncate">
                    {isExpanded ? 'show less' : 'show more'}
                </Button>
            )}
        </>
    );
};

export default TruncatedText;
