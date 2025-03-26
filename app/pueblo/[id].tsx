import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { pueblosMagicos } from '@/constants/pueblosMagicos';
import MapView, { Marker } from 'react-native-maps';

export default function PuebloDetalle() {
  const { id } = useLocalSearchParams();
  const pueblo = pueblosMagicos.find((p) => p.id.toString() === id);

  if (!pueblo) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Pueblo no encontrado 😢</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: pueblo.imagen }} style={styles.image} />
      <Text style={styles.title}>{pueblo.nombre}</Text>
      <Text style={styles.desc}>{pueblo.descripcion}</Text>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: pueblo.latitud,
            longitude: pueblo.longitud,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
        >
          <Marker
            coordinate={{
              latitude: pueblo.latitud,
              longitude: pueblo.longitud,
            }}
            title={pueblo.nombre}
          />
        </MapView>
      </View>

      <Text style={styles.coords}>
        📍 Coordenadas: {pueblo.latitud}, {pueblo.longitud}
      </Text>

      <Text style={styles.extra}>
        ✨Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus neque eos harum, in placeat tenetur obcaecati quo corporis veniam tempora qui rem! Facilis sint optio cumque at, necessitatibus maiores excepturi.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 30,
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width,
    height: 220,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#1e293b',
    textAlign: 'center',
  },
  desc: {
    fontSize: 16,
    color: '#475569',
    marginTop: 10,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  mapContainer: {
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
    width: '90%',
    height: 200,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
  },
  map: {
    width: '100%',
    height: '100%',
  },
  coords: {
    marginTop: 16,
    fontSize: 14,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  extra: {
    marginTop: 20,
    fontSize: 14,
    color: '#6b7280',
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  error: {
    fontSize: 18,
    color: 'red',
    marginTop: 40,
  },
});
