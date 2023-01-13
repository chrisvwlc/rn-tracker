import '../_mockLocation';
//import React, { useEffect, useState, useContext } from 'react';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { requestForegroundPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';
import Map from '../components/Map';
import { Context as LocationContext} from '../context/LocationContext';
import useLocation from '../hooks/useLocation';

const TrackCreateScreen = () => {
  const { addLocation} = useContext(LocationContext);

  //const [err] = useLocation((location) => addLocation(location));

  const [err] = useLocation(addLocation);
  
  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text h2>Create a Track</Text>
      <Map />
      {err ? <Text>Please enable location services</Text> : null }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    map: {
        height: 300
    }
});

export default TrackCreateScreen;