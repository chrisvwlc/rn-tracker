import { NavigationActions } from 'react-navigation';


let navigator;
//we want to be able to reassign this variable in the future

export const setNavigator = (nav) => {
    navigator = nav;
};

export const navigate = (routeName, params) => {
    navigator.dispatch (
        NavigationActions.navigate({
          routeName: routeName,
          params: params  
        })
    );
};
