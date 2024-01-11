import { useEffect, useRef } from 'react';

const useObserver = ({ isEnabled, callback }) => {
    const sentinelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                const target = entries[0];
                if (target?.isIntersecting && isEnabled) {
                    callback();
                }
            },
            { threshold: 1 }
        );

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => {
            if (sentinelRef.current) {
                observer.unobserve(sentinelRef.current);
            }
        };
    }, [isEnabled, sentinelRef.current, callback]);

    return {
        sentinelRef,
    };
};

export default useObserver;
