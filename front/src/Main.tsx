import React, {useState} from 'react';
import Header from './header';
import Calendar from './calendar';
import LoginContext from './LoginContext';

function Main() {
    const [managerId, setManagerId] = useState<number | null>(null);
    return (
        <LoginContext.Provider value={{managerId, setManagerId}}>
            <Header />
            <Calendar />
        </LoginContext.Provider>
    )
}

export default Main;
