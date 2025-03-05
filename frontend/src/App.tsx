import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { HomeScreen } from './navigation/screens/Home';
import { AltaScreen } from './navigation/screens/Alta';
import { ListadoScreen } from './navigation/screens/Listado';
import type { ReactElement } from 'react';

const Drawer = createDrawerNavigator();

function MyDrawer(): ReactElement {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Alta" component={AltaScreen} />
      <Drawer.Screen name="Listado" component={ListadoScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </GluestackUIProvider>
  );
}