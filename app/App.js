import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './context/auth/AuthProvider';
import Login from 'app/screens/Login';
import HomeNavigation from 'app/navigation/HomeNavigation';
import SignUp from 'app/screens/SignUp';
import DeviceOptions from './screens/DeviceOptions';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeNavigation"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="HomeNavigation" component={HomeNavigation} />
          <Stack.Screen name="DeviceOptions" component={DeviceOptions} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
