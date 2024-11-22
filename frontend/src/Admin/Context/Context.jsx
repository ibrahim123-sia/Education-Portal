import React, { createContext, useState } from 'react';


export const Context = createContext(null);

const ContextProvider = (props) => {
    const [username, setUserName] = useState('');

    
    const contextValues = { username, setUserName };

    return (
        <Context.Provider value={contextValues}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
