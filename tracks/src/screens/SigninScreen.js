import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { NavigationEvents } from 'react-navigation';
import { Context } from '../context/AuthContext';

{/* <NavigationEvents 
onWillFocus = { () => {} }
onDidFocus = { () => {} }
onWillBlur = { () => {} }
onDidBlur = { () => {} }
/> */}
//in the following its unnecessary to have the added arrow fn..
{/* <NavigationEvents 
    onWillBlur={ () => { clearErrorMessage() }}
/> */}

const SigninScreen = () => {
    const { state, signin, clearErrorMessage } = useContext(Context);
    return (
        
        <View style={styles.container}>

            <NavigationEvents 
                onWillBlur={clearErrorMessage}
            />
            <AuthForm 
                headerText="Sign In to your Account"
                errorMessage={state.errorMessage}
                onSubmit={signin}
                submitButtonText="Sign in"
            />
            <NavLink 
                routeName="Signup"
                linkText = "Don't have an account? Sign up instead"
            />
        </View>
    );
};

SigninScreen.navigationOptions = () => {
    return {
        // header: null
        headerShown: false
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 250
    }
});

export default SigninScreen;
