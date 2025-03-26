import { StyleSheet, View, Dimensions, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRef, useState } from 'react';
import { pueblosMagicos } from '@/constants/pueblosMagicos';
import PuebloCard from '@/components/PuebloCard';

export default function Index() {
  const [activeMarkerId, setActiveMarkerId] = useState<number | null>(null);
  const mapRef = useRef<MapView>(null);

  const irALugar = (lat: number, lng: number, id: number) => {
    setActiveMarkerId(id);
    mapRef.current?.animateToRegion(
      {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
      1000
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 21.1215,
          longitude: -86.8901,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        }}
      >
        {/* Marcador fijo de UT Cancún */}
        <Marker
          coordinate={{ latitude: 21.1215, longitude: -86.8901 }}
          title="UT Cancún"
        />

        {/* Marcadores de Pueblos Mágicos */}
        {pueblosMagicos.map((pueblo) => (
          <Marker
            key={pueblo.id}
            coordinate={{
              latitude: pueblo.latitud,
              longitude: pueblo.longitud,
            }}
            title={pueblo.nombre}
            description={pueblo.descripcion}
            pinColor={activeMarkerId === pueblo.id ? '#3b82f6' : 'red'} // marcador activo
          />
        ))}
      </MapView>

      {/* Lista de tarjetas */}
      <View style={styles.listContainer}>
        <FlatList
          data={pueblosMagicos}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 12 }}
          renderItem={({ item }) => (
            <PuebloCard
              pueblo={item}
              onPress={() => irALugar(item.latitud, item.longitud, item.id)}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  listContainer: {
    position: 'absolute',
    bottom: 20,
  },
});
