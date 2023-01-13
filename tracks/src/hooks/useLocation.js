import { useState, useEffect } from 'react';
import { Accuracy, requestForegroundPermissionsAsync, watchPositionAsync } from 'expo-location';


//create and export our custom hook
//go to some componenet and inspect the variables created for ones which
//we want to make reusable for the logic we want to make reusable
//in this case, everything to do with tracking location...

//what arguments is this going to take?
//what is it going to return? -look at original component to see variables in return statement
//only the err value comes from this hook now...so in this hook include an array with err inside of it
//an array becasuse we might want to return a number of diff variables.
//could be returned in an object or by itself but convention is array

export default (callback) => {

    const [err, setErr] = useState(null); //tied to location

    const startWatching = async () => {
        try {
          const { granted } = await requestForegroundPermissionsAsync();
          if(!granted){
            throw new Error('Location permission not granted');
          }
          
          await watchPositionAsync(
            {
                //Location.watchPositionAsync(options, callback)
                accuracy: Accuracy.BestForNavigation,
                timeInterval: 1000,
                distanceInterval: 10
            }, 
            callback
          );
        } catch (e) {
          setErr(e);
        }
      };

      useEffect(() => {
        startWatching();
      }, []);

      return [err];
    
    
};
