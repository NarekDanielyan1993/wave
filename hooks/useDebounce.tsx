import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number) {
    const [debounce, setDebounce] = useState<T>(value);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounce(value);
        }, delay);
        return () => clearTimeout(timeout);
    }, [value]);
    return {
        debounce,
    };
}
