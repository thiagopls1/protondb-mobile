import { ScrollView, StyleSheet, StatusBar, Text } from 'react-native';

export default function Explore() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Página explorar (Em construção)</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // This will avoid container above StatusBar
    marginTop: StatusBar.currentHeight,
  },
});
