import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Button,
  Pressable,
} from 'react-native';
import { useState } from 'react';
import user from 'models/user';

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignUp() {
    const createdUser = await user.signUp(email, password);
    if (!createdUser) {
      alert('Erro ao criar o usuário!');
    } else {
      alert('Usuário criado com sucesso!');
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
      <Pressable onPress={() => navigation.navigate('Login')}>
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
