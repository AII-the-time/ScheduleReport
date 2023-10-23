import axios from 'axios';
import {apiWrapperForErrorHandling} from './';

export const getAccessToken = async (refreshToken: string) => {
    try {
        const { data } = await axios.post(`/api/manager/refresh`,{},{
            headers: {
                'Authorization': `Bearer ${refreshToken}`
            }
        });
        return data.accessToken;
    } catch (e) {
        return null;
    }
};
