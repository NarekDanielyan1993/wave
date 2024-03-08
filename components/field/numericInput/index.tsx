import { Input } from '@chakra-ui/react';
import React from 'react';
import { NumberFormatBase } from 'react-number-format';

const NumericInput = ({
    onChange,
    value,
    placeholder,
}: {
    placeholder: string;
    value: number | string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    const format = (numStr: string) => {
        if (numStr === '') {
            return '1';
        }
        if (numStr.startsWith('0')) {
            return numStr.substring(1);
        }
        return numStr;
    };
    return (
        <NumberFormatBase
            customInput={Input}
            format={format}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
        />
    );
};

export default NumericInput;
