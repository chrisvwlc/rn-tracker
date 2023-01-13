import createDataContext from './createDataContext';

const locationReducer = (state, action) => {
    switch (action.type){
        case 'add_current_location':
            return { ...state, currentLocation: action.payload };
        default: 
            return state;
    }
};
//below is a function that gets called with dispatch and returns another fun.
//action functions
const startRecording = dispatch => () => {};
const stopRecording = dispatch => () => {};
const addLocation = dispatch => location => {
    dispatch({type: 'add_current_location', payload: location});
};

//createDataContext(<reducer>, <{}=diff action fns>, <{}=initial state object from>)
export const { Context, Provider } = createDataContext(
    locationReducer,
    {startRecording,stopRecording, addLocation },
    {recording: false, locations: [], currentLocation: null}
);