import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Explore from 'screens/Explore';
import Home from 'screens/Home';
import Profile from 'screens/Profile';

const iconsDict = {
  Início: 'home',
  Explorar: 'search',
  Perfil: 'person',
};

export default function HomeNavigation({ navigation }) {
  const Tabs = createBottomTabNavigator();

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const routeValue = iconsDict[route.name];

          if (!routeValue) {
            const iconName = focused
              ? 'question-circle'
              : 'question-circle-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          }

          const iconName = focused ? routeValue : `${routeValue}-outline`;
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tabs.Screen name="Início" component={Home} />
      <Tabs.Screen name="Explorar" component={Explore} />
      <Tabs.Screen name="Perfil" component={Profile} />
    </Tabs.Navigator>
  );
}
