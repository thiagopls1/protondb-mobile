import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

const typesDict = {
  desktop: 'Desktop',
  steam_deck: 'Steam Deck',
};

export default function Device({ data }) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => {}}>
      <View>
        <Text style={styles.title}>{typesDict[data.type]}</Text>
        <View style={styles.infoContainer}>
          <Text>Distro Linux: {data.distro}</Text>
          <Text>Versão do Kernel: {data.kernel}</Text>
          <Text>CPU: {data.cpu}</Text>
          <Text>GPU: {data.gpu}</Text>
          <Text>Driver da GPU: {data.gpu_driver}</Text>
          <Text>RAM: {data.ram}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    marginBottom: 10,
  },
  infoContainer: {
    paddingVertical: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
