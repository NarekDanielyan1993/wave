import { Input } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { NumberFormatBase } from 'react-number-format';

const NumericInput = ({
    onChange,
    value,
    width,
}: {
    value: any;
    width?: string;
    onChange: (type: '+' | '-' | 'val', value: number) => void;
}) => {
    const format = (numStr: string) => {
        if (numStr === '') return '1';
        if (numStr.startsWith('0')) {
            return numStr.substring(1);
        }
        return numStr;
    };
    return (
        <NumberFormatBase
            format={format}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onChange('val', Number(e.target.value))
            }
            w={'4rem'}
            maxW={'4rem'}
            minW={'4rem'}
            value={value}
            customInput={Input}
            isAllowed={values => {
                const { floatValue } = values;
                return floatValue < 10000;
            }}
        />
    );
};

export default NumericInput;
