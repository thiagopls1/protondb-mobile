import { useAuth } from 'app/context/auth/useAuth';
import { View, Text, StyleSheet, Button, StatusBar } from 'react-native';
import { signOut, getAuth } from 'firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-web';

export default function Profile({ navigation }) {
  const { user } = useAuth();
  async function handleLogout() {
    await signOut(getAuth());
    alert('Logout feito com sucesso');
  }

  if (!user || user === null) {
    return (
      <View
        style={[
          styles.container,
          { gap: 30, justifyContent: 'center', alignItems: 'center' },
        ]}
      >
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
      <View style={styles.profileInfoContainer}>
        <Ionicons name="person" size={60} />
        <View>
          <Text style={styles.textBold}>{user.email}</Text>
          <Text>Reports criados: 0</Text>
          <Text>Dispositivos: 2</Text>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <Button title="Editar Perfil" />
        <Button title="Fazer Logout" onPress={handleLogout} />
      </View>
      <View style={styles.separator}></View>
      <View style={styles.devicesContainer}>
        <Text style={[styles.title, styles.textBold]}>Dispositivos</Text>
        <View></View>
        <Button title="+ Novo dispositivo" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  profileInfoContainer: {
    flex: 0.15,
    flexDirection: 'row',
    padding: 25,
    gap: 10,
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  devicesContainer: {
    flexDirection: 'column',
    paddingHorizontal: 15,
    gap: 10,
  },
  title: {
    fontSize: 19,
    paddingHorizontal: 15,
    textAlign: 'center',
  },
  textBold: {
    fontWeight: 'bold',
  },
  separator: {
    flex: 0.003,
    marginVertical: 5,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
  },
});
