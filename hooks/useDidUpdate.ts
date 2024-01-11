import { useEffect, useRef } from 'react';

const useDidUpdate = (func, dependancies) => {
    const isMount = useRef(true);
    useEffect(() => {
        console.log(isMount);
        if (!isMount.current) {
            console.log(isMount);
            func();
        }
        isMount.current = false;
    }, dependancies);
};

export default useDidUpdate;
