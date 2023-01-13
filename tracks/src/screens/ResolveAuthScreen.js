import React, { useEffect, useContext } from 'react';
import {Context as AuthContext} from '../context/AuthContext';

//make component
//get trylocalsignin fn from context
//better not to show spinner because it's disorienting to user...
const ResolveAuthScreen = () => {
    const { tryLocalSignin } = useContext(AuthContext);
    useEffect(() => {
        tryLocalSignin();
    }, []);
    return null;
};

export default ResolveAuthScreen;