import { useState } from 'react';

const useToggle = (defaultValue: boolean) => {
    const [value, setValue] = useState(defaultValue);
    const toggle = (value?: boolean) => {
        setValue(prev => value || !prev);
    };
    return {
        value,
        toggle,
    };
};

export default useToggle;
