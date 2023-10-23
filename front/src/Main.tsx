import React, { useState, useEffect } from 'react';
import Header from './header';
import Calendar from './calendar';
import LoginContext from './LoginContext';
import Loading from './components/Loading';
import { getRefreshTokenFromCookie } from './utils/cookie';
import { getAccessToken } from './apis/login';

function Main() {
    const [isLodingForLogin, setIsLodingForLogin] = useState<boolean>(true);
    const [accessToken, setAccessToken] = useState<string|null>(null);
    const [modalType, setModalType] = useState<"LOGIN" | "STORE_INFO" | "WORKER_INFO" | null>(null);
    useEffect(()=>{
        (async () => {
            const refreshToken = getRefreshTokenFromCookie();
            if(!refreshToken) return setIsLodingForLogin(false);
            const accessToken = await getAccessToken(refreshToken);
            setAccessToken(accessToken);
            setIsLodingForLogin(false);
        })();
    },[]);
    return (
        <LoginContext.Provider value={{accessToken, setAccessToken, modalType, setModalType}}>
            <Header />
            {isLodingForLogin?<Loading text="로그인 확인 중"/>:<Calendar />}
        </LoginContext.Provider>
    )
}

export default Main;
