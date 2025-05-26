import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Login from 'screens/Login.js';
import HomeNavigation from 'navigation/HomeNavigation';
import { AuthProvider } from './context/auth/AuthProvider';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="HomeNavigation"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="HomeNavigation" component={HomeNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
