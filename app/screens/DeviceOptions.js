import { Button, StatusBar, StyleSheet, Text, View } from 'react-native';

export default function ({ navigation, route }) {
  const device = route.params;
  console.log(device);
  return (
    <View style={styles.container}>
      <Text>Página de opções do dispositivo</Text>
      <Button
        title="Voltar"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
