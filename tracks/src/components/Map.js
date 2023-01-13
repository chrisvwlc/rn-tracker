import React, { useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import MapView, { Polyline, circle, Circle } from 'react-native-maps';
import { ActivityIndicator } from 'react-native-paper';
import { Context as LocationContext} from '../context/LocationContext';

//can we update mapcenter if user goes outside of bounding box
const Map = () => {
  const { 
    state: { currentLocation } 
  } = useContext(LocationContext);

  if(!currentLocation) {
    return <ActivityIndicator size="large" style={{marginTop: 200}} />;
  }
  //if we eliminate region prop, the map stays fixed.
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
      region={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
    >
    <Circle
      center={currentLocation.coords}
      radius={120}
      strokeColor="rgba(158, 158, 255, 1.0)"
      fillColor="rgba(158, 158, 255, 0.3)"
    />
    </MapView>
       
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300
  }
});

export default Map;