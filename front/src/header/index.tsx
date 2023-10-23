import React, { useContext } from 'react';
import LoginContext from '../LoginContext';
import styled from 'styled-components';
import Button from '../components/Button';

const Header = styled.div`
    width: 100%;
    height: 50px;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 max(calc(50% - 500px), 20px);
`;

const LogoTitle = styled.div`
    height: 100%;
    gap: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
    color: var(--color-primary);
`;

const ButtonGroup = styled.div`
    height: 100%;
    gap: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function () {

    const {accessToken,setAccessToken} = useContext(LoginContext);
    return (
        <Header>
            <LogoTitle>CAFE POS</LogoTitle>
            <ButtonGroup>
                {accessToken && <Button text="가게 정보 변경" />}
                {accessToken && <Button text="근무자 관리" /> }
                {accessToken ? <Button text="로그아웃" onClick={()=>{setAccessToken(null)}} /> : <Button text="로그인" onClick={()=>{setAccessToken("as")}}/>}
            </ButtonGroup>
        </Header>
    )
}
