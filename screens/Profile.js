import { useAuth } from 'context/auth/useAuth';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function Profile({ navigation }) {
  const { user, setUser } = useAuth();

  if (!user) {
    return (
      <View style={[styles.container, { gap: 50 }]}>
        <Text style={styles.title}>
          É necessário uma conta para ver seu perfil
        </Text>
        <Button
          title="Fazer Login"
          onPress={() => navigation.navigate('Login')}
        />
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
  },
  title: {
    fontSize: 18,
  },
});
