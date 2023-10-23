import styled from 'styled-components';

const LoadingWrapper = styled.div`
    padding: 2rem;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const LoadingText = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--color-primary);
    margin-top: 1rem;
`;

const LoadingCircle = styled.div`
    width: 5rem;
    height: 5rem;
    border: 0.5rem solid var(--color-primary);
    border-radius: 50%;
    border-top-color: transparent;
    animation: rotate 1s linear infinite;

    @keyframes rotate {
        to {
            transform: rotate(360deg);
        }
    }
`;


export default function ({ text, ...options}: { text: string, [key: string]: any }) {
    return (
        <LoadingWrapper {...options}>
            <LoadingCircle />
            <LoadingText>{text}</LoadingText>
        </LoadingWrapper>
    )
}
