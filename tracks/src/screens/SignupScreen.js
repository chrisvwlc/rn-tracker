//import { red } from 'color-name';
import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
//import { NavigationEvents } from 'react-navigation';
//import { Text } from 'react-native-elements';
//import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
//import { navigate } from '../navigationRef';
import AuthForm  from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { NavigationEvents } from 'react-navigation';

//remember to bring in navigation prop to use

const SignupScreen = ({ navigation }) => {
    //when user clicks signup button, it will inititate the action
    //we only want to tryLocalSignin exactly once so useEffect...
    const { state, signup, clearErrorMessage } = useContext(AuthContext);

    // useEffect(() => {
    //     tryLocalSignin();
    // }, []);
    //headerText and on Submit are fixed
    //errorMessage is coming from AuthContext state
    // onSubmit = {({email, password}) => signup({ email, password })}

    return ( 
    <View style={styles.container}>
        <NavigationEvents onWillBlur = {clearErrorMessage } />
       <AuthForm 
            headerText = "Sign up for Tracker"
            errorMessage = { state.errorMessage }
            submitButtonText = "Sign up"
            onSubmit = {signup}
       />
         <NavLink 
            routeName='Signin'
            linkText="Already have an account? Sign in instead"
         />   
            
        {/* <Button title="Go to Signin" onPress={() => { navigation.navigate('Signin') }} />
        <Button title="Go to MainFlow" onPress={() => { navigation.navigate('mainFlow') }} /> */}

    </View>
    );
};

// if we define navigation options and assign a function we can return an object that is

// going to customize our Stack Navigator and change the way in which react navigation behaves and shows

// the screen.
SignupScreen.navigationOptions = () => {
    return {
        // header: null
        headerShown: false
    };
};

// SignupScreen.navigationOptions = {
//     header: null
// };

const styles = StyleSheet.create({
    container: {
        
        flex: 1,
        justifyContent: 'center',
        marginBottom: 200,
    }
});

export default SignupScreen;