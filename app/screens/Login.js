import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import { useState } from 'react';
import user from 'models/user';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function alertLoginSuccess() {
    return Alert.alert('Aviso', 'Login feito com sucesso!', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
  }

  function alertLoginFailure(error) {
    return Alert.alert(error.message, error.action, [
      {
        text: 'OK',
      },
    ]);
  }

  async function handleLogin() {
    try {
      await user.authenticate(email, password);
      alertLoginSuccess();
    } catch (error) {
      alertLoginFailure(error);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={email}
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        value={password}
        style={styles.input}
        placeholder="Senha"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Fazer Login" onPress={handleLogin} />
      <Pressable onPress={() => navigation.replace('SignUp')}>
        <Text style={styles.newAccountText}>
          Não possui uma conta?{' '}
          <Text style={styles.linkText}>Criar uma conta agora</Text>
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  linkText: {
    color: 'darkblue',
  },
  newAccountText: {
    fontSize: 15,
  },
  input: {
    width: 250,
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  actionContainer: {
    marginVertical: 15,
    gap: 15,
  },
});
