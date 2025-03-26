import * as Animatable from 'react-native-animatable';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

type Props = {
  pueblo: {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
  };
  onPress: () => void;
};

export default function PuebloCard({ pueblo, onPress }: Props) {
  const router = useRouter();
  let buttonRef: any = null;

  const handleCardPress = () => {
    router.push(`/pueblo/${pueblo.id}`);
  };

  const handleButtonPress = () => {
    if (buttonRef) buttonRef.bounce(400);
    setTimeout(() => onPress(), 400);
  };

  return (
    <Animatable.View animation="zoomIn" duration={600} style={styles.card}>
      <TouchableOpacity onPress={handleCardPress} activeOpacity={0.9}>
        <Animatable.Image
          animation="fadeIn"
          delay={200}
          duration={800}
          source={{ uri: pueblo.imagen }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <Animatable.Text animation="fadeInDown" delay={400} style={styles.title}>
            {pueblo.nombre}
          </Animatable.Text>
          <Animatable.Text animation="fadeInUp" delay={500} style={styles.desc}>
            {pueblo.descripcion}
          </Animatable.Text>
        </View>
      </TouchableOpacity>

      <Animatable.View ref={(ref) => (buttonRef = ref)} animation="fadeInUp" delay={600}>
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>📍 Ver en el mapa</Text>
        </TouchableOpacity>
      </Animatable.View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    width: 260,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 6,
  },
  image: {
    width: '100%',
    height: 140,
  },
  textContainer: {
    padding: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginBottom: 6,
  },
  desc: {
    fontSize: 13,
    color: '#555',
    marginBottom: 14,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 14,
    marginBottom: 14,
    shadowColor: '#3b82f6',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
