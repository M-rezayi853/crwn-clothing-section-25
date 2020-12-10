import styled from 'styled-components';


export const SignInContainer = styled.div`
    width: 380px;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 800px) {
        width: 100%;
        margin-top: 30px;
    }
`;

export const Title = styled.h2`
    margin: 10px 0;
`;

export const ButtonsBar = styled.div`
    display: flex;
    justify-content: space-between;
`;