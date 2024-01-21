import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LatLng, LeafletView } from 'react-native-leaflet-view';

const MapScreen = ({ route }) => {
  const { gps } = route.params;
  const latitude = parseFloat(gps.latitude);
  const longitude = parseFloat(gps.longitude);

  console.log(latitude);
  console.log(longitude);

  const openStreetMapLayer = {
    baseLayerName: 'OpenStreetMap',
    baseLayerIsChecked: 'true',
    layerType: 'TileLayer',
    baseLayer: true,
    url: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    tileSize: 256
  };

  const initialPosition = {
    lat: latitude,
    lng: longitude,
  };

  const marker = {
    id: '1',
    position: initialPosition,
    icon: '📍',
    size: [32, 32],
    animation: {
      duration: '0.5s',
      delay: '0s',
      iterationCount: 1,
      type: 'BOUNCE',
    },
  };

  return (
    <View style={styles.container}>
      <LeafletView
        baseLayer={openStreetMapLayer}
        mapCenterPosition={initialPosition}
        zoom={9}
        mapMarkers={[marker]}
        onMessageReceived={(event) => {
          console.log(event);
        }}
      />
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});