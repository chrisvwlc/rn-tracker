import React,  { useState } from 'react';
import { StyleSheet} from 'react-native';
import {Text, Button, Input } from 'react-native-elements';
import Spacer from './Spacer';

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
    //both will use state elements
    //we're going through our hardcoded jsx and replacing with props passed in from Signup
    //WE ARE RECEIVING THESE PROPS
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    return (
        <>
        <Spacer>
            <Text h3>{headerText}</Text>
        </Spacer>
        <Input 
            label="Email" 
            value={email} 
            onChangeText={ setEmail }
            autoCapitalize="none"
            autoComplete={false}
        />
        <Input secureTextEntry={true} label="Password" value={password} onChangeText={ setPassword } autoCapitalize="none" autoComplete={false}  />
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null }

        <Spacer>
            <Button title={submitButtonText} onPress={() => onSubmit({ email, password })} />
        </Spacer>
        </>
    );
};

const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 16,
        color: 'red',
    },
});

export default AuthForm;

