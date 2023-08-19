import { ErrorContainer, ErrorMessage, Title } from './style';

const Error500 = () => (
    <ErrorContainer>
        <Title>Oops! Something went wrong.</Title>
        <ErrorMessage>
            Please try refreshing the page or contact support if the problem
            persists.
        </ErrorMessage>
    </ErrorContainer>
);

export default Error500;
