import NumericField from '@components/field/numericInput';

const PriceInput = ({
    placeholder,
    name,
}: {
    name: string;
    placeholder: string;
}) => <NumericField name={name} placeholder={placeholder} prefix="$" />;

export default PriceInput;
