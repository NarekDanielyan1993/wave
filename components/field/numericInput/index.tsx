import React from 'react';
import { NumericFormat } from 'react-number-format';
import { StyledInput } from '../style';

const NumericInput = ({
    onChange,
    value,
    isInvalid,
    placeholder,
}: {
    isInvalid: boolean;
    placeholder: string;
    value: number | string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
    <NumericFormat
        allowLeadingZeros={false}
        allowNegative={false}
        customInput={StyledInput}
        isInvalid={isInvalid}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
    />
);
export default NumericInput;
