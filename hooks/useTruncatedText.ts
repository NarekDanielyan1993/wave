import { useMemo, useState } from 'react';

export const useTruncateText = (text: string, maxLength: number = 200) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const shouldTruncate = useMemo(() => text.length > maxLength, [text]);

    const truncatedText = useMemo(
        () =>
            shouldTruncate && !isExpanded
                ? text.slice(0, maxLength) + '...'
                : text,
        [text, isExpanded]
    );

    const handleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    return {
        truncatedText,
        isExpanded,
        shouldTruncate,
        handleExpand,
    };
};
