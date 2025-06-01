import { useAuth } from 'app/context/auth/useAuth';
import {
  Button,
  FlatList,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { signOut, getAuth } from 'firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Device from 'app/components/Device';
import userModel from 'models/user';
import { useEffect, useState } from 'react';
import {} from 'react-native-web';

export default function Profile({ navigation }) {
  const { user, setUser } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function getUserData() {
      if (user) {
        const data = await userModel.get(user.uid);
        setUserData(data);
      }
    }

    getUserData();
  }, [user]);

  const devicesMock = [
    {
      distro: 'Arch Linux',
      kernel: '6.14.2-zen1-1-zen',
      cpu: 'AMD Ryzen 5',
      gpu: 'NVIDIA GeForce RTX 3060',
      gpu_driver: 'NVIDIA 570.133.07',
      ram: '16 GB',
      type: 'desktop',
    },
    {
      distro: 'Steam OS Holo',
      kernel: '5.13.0-valve10.1-1-neptune',
      cpu: 'AMD Custom APU 0405',
      gpu: 'AMD Custom GPU 0405',
      gpu_driver: '4.6 Mesa 22.0.0-devel',
      ram: '15 GB',
      type: 'steam_deck',
    },
  ];

  function handleNewDevice() {
    setUserData({
      ...userData,
      devices: [...userData.devices, devicesMock[1]],
    });
  }

  async function handleLogout() {
    console.log(user.uid);
    console.log(await userModel.get(user.uid));
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
          <Text>Dispositivos: {userData?.devices.length || 0}</Text>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <Button title="Editar Perfil" />
        <Button title="Fazer Logout" onPress={handleLogout} />
      </View>
      <View style={styles.separator}></View>
      <View style={styles.devicesContainer}>
        <Text style={[styles.title, styles.textBold]}>Dispositivos</Text>
        <View style={{ paddingBottom: 20 }}>
          <Button title="+ Novo dispositivo" onPress={handleNewDevice} />
        </View>
        <FlatList
          data={userData?.devices}
          renderItem={(item) => (
            <Device
              data={{ index: item.index, ...item.item, user_uid: user.uid }}
              navigation={navigation}
            />
          )}
          contentContainerStyle={{ marginBottom: 20 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.65,
    marginTop: StatusBar.currentHeight,
  },
  profileInfoContainer: {
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
