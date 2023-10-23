import styled from 'styled-components';

const Button = styled.button`
    padding: 0.5rem 1rem;
    border: 1px solid var(--color-primary-alpha);
    border-radius: 0.5rem;
    background-color: var(--color-background);
    font-size: 1rem;
    font-weight: bold;
    color: var(--color-primary);
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        background-color: var(--color-primary);
        color: #fff;
    }
`;


export default function ({ text, ...buttonOptions}: { text: string, [key: string]: any }) {
    return (
        <Button {...buttonOptions}>
            {text}
        </Button>
    )
}
