import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Button,
  Pressable,
} from 'react-native';
import { useState } from 'react';
import auth from 'models/auth';
import user from 'models/user';
import alert from 'infra/alert';

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function alertSignUpSuccess() {
    return alert('Aviso', 'Conta criada com sucesso', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
  }

  function alertSignUpFailure(error) {
    return alert(error.message, error.action, [
      {
        text: 'OK',
      },
    ]);
  }

  async function handleSignUp() {
    try {
      const newUserData = await auth.signUp(email, password);
      await user.create({
        uid: newUserData.user.uid,
        username: newUserData.user.email,
        devices: [],
      });
      alertSignUpSuccess();
    } catch (error) {
      console.log(error);
      alertSignUpFailure(error);
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
      <Button title="Criar Conta" onPress={handleSignUp} />
      <Pressable onPress={() => navigation.replace('Login')}>
        <Text style={styles.newAccountText}>
          Já possui uma conta? <Text style={styles.linkText}>Fazer login</Text>
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
