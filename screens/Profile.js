import { useAuth } from 'context/auth/useAuth';
import { View, Text, StyleSheet, Button, StatusBar } from 'react-native';

export default function Profile({ navigation }) {
  const { user, setUser } = useAuth();

  if (!user) {
    return (
      <View style={[styles.container, { gap: 30 }]}>
        <Text style={styles.title}>
          É necessário uma conta para ver seu perfil
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            title="Fazer Login"
            onPress={() => navigation.navigate('Login')}
          />
          <Button
            title="Criar uma conta"
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Página de perfil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: StatusBar.currentHeight,
  },
  title: {
    fontSize: 19,
    paddingHorizontal: 15,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
