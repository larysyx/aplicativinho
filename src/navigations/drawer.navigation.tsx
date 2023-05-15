import React from 'react';
import { DrawerNavigationProp, createDrawerNavigator } from '@react-navigation/drawer';
import { ScreenCamera, ScreenPerfil } from "../screens"
import { colors } from '../styles/colors';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
type DrawerParamList = {
  Perfil: undefined
  Camera: undefined
}
type DrawerScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'Perfil'>
export type TabTypes = {
  navigation: DrawerScreenNavigationProp
}
export function DrawerNavigation() {
  const Drawer = createDrawerNavigator<DrawerParamList>();
  return (
    <Drawer.Navigator screenOptions={{
      drawerStyle: {
        backgroundColor: colors.laranjinha
      },
      drawerActiveTintColor: colors.white
    }}>
      <Drawer.Screen name='Perfil' component={ScreenPerfil}
        options={{
          drawerIcon: () => (
            <Ionicons name='person' size={24} color={colors.laranjaescuro} />
          )
        }}
        />
        <Drawer.Screen name="Camera" component={ScreenCamera}
          options={{
            drawerIcon: () => (
              <Feather name="camera" color={colors.laranjaescuro} size={24} />
            )
          }} />
    </Drawer.Navigator>
  );
}