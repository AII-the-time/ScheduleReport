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

    const {managerId,setManagerId} = useContext(LoginContext);
    return (
        <Header>
            <LogoTitle>CAFE POS</LogoTitle>
            <ButtonGroup>
                {managerId && <Button text="가게 정보 변경" />}
                {managerId && <Button text="근무자 관리" /> }
                {managerId ? <Button text="로그아웃" onClick={()=>{setManagerId(null)}} /> : <Button text="로그인" onClick={()=>{setManagerId(1)}}/>}
            </ButtonGroup>
        </Header>
    )
}
