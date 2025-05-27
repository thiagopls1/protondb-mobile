import { View, Text, StyleSheet } from 'react-native';

export default function SignUp() {
  return (
    <View style={styles.container}>
      <Text>Página de criação de conta</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
