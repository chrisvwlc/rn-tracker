import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

//always gets called with state and action
//this function will get called directly by react when we call dispacth()
//remember switch and action type...

const authReducer = (state, action) => {
    //take all properties of state and add to new state object, overwriting particular properties we want updated
    switch (action.type) {
        case 'add_error':
            return {...state, errorMessage: action.payload};
        //we don't need 2 separate cases...
        // case 'signup': 
        //     return { errorMessage: '', token: action.payload };
        case 'signin':
            return { errorMessage: '', token: action.payload };
        case 'clear_error_message':
            return { ...state, errorMessage: '' };
        case 'signout':
                return { token: null, errorMessage: ''};
        default:
            return state;
    }
};

//scaffolding for action functions underneath reducer fn
/*
Remember, whenever we create an action function
it's going to be a function called
with dispatch that's going to return a function
and the inner function right here
that's what actually gets called inside of our component.
The only reason we've got this set
up right here is that remember
inside of our create data context, we need to get access
to the dispatch that is only given to us right here.
So the only way that we can really get that variable
available inside of our actions is to go
through this entire bound actions process, call each one
of those different action functions with dispatch
and that will give this inner function right here
access to the dispatch function that we really care about.
*/

const clearErrorMessage = dispatch => () => {
    dispatch({type: 'clear_error_message'})
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if(token) {
        dispatch({type: 'signin', payload: token});
        navigate('TrackList');
    } else {
        navigate('loginFlow');
    }
};

const signup = dispatch => {
    
    return async ({ email, password }) => {
        //called from component
        //pass along email an pw user wants to sign up with
        
        //if we sign up, modify state and flag that we're authenticated
        //authreducer manages state

        //if signup fails, we need to display an error somewhere
        try {
            //make a post api request to 'signup' route to sign up w email & pw passed into fn
            const response = await trackerApi.post('/signup', { email, password });
            //response.data has token on it...
            //console.log(response.data);
            //get the token and store it on the device...
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type: 'signin', token: response.data.token });
            navigate('TrackList');

        } catch (err) {
            dispatch({type: 'add_error', payload: 'Sorry, something went wrong with signup.'});
            //console.log(err.response.data);
            console.log(err.message); 
            //or console.log(err.message); for simpler response
        }
    };
}

const signin = dispatch => async ({ email, password }) => {

    //1.make api request to sign up w email & pw
    //2.if we sign up, modify state and flag that we're authenticated
    //authreducer manages state
    //3.handle failure display an error somewhere
    try {
        const response = await trackerApi.post('/signin', { email, password } );
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({type: 'signin', payload: response.data.token});
        navigate('TrackList');
    }

    catch ( err ) {
        dispatch ({
            type: 'add_error',
            payload: "Something went wrong."
        })
    }
};

const signout = (dispatch) => {
    
    return async () => {
        await AsyncStorage.removeItem('token');
        dispatch({type: 'signout'});
        navigate('loginFlow');
    };
}


export const { Provider, Context } = createDataContext(
    //passing our fns into 2nd param makes them available to context
    authReducer,
    {signup, signin, signout, clearErrorMessage, tryLocalSignin},
    //this is where we define initial state object
    { token: null, errorMessage: '' }
);