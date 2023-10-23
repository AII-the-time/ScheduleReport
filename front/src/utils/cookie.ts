import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setRefreshToken = (refreshToken:string) => {
    const today = new Date();
    const expireDate = today.setDate(today.getDate() + 7);

    cookies.set('refresh_token', refreshToken, { 
        sameSite: 'strict', 
        path: "/", 
        expires: new Date(expireDate)
    });
};

export const getRefreshTokenFromCookie = () => {
    const token = cookies.get('refresh_token');
    if(typeof token === 'string') return token;
    return null;
};

export const removeRefreshToken = () => {
    cookies.remove('refresh_token', { sameSite: 'strict', path: "/" })
}
