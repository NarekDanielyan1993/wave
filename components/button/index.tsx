import clsx from 'clsx';
import { ButtonTypes } from 'types';
import StyledButton from './style';

const Button = ({ renderAs, buttonVariant, ...props }: ButtonTypes) => (
    <StyledButton className={clsx(renderAs && renderAs)} {...props} />
);

export default Button;
