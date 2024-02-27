import { useEffect, useRef } from 'react';

const useDidUpdate = (func, dependancies) => {
    const isMount = useRef(true);
    useEffect(() => {
        if (!isMount.current) {
            func();
        }
        isMount.current = false;
    }, dependancies);
};

export default useDidUpdate;
