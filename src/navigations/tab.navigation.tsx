import React from 'react';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ScreenCamera, ScreenPerfil, ScreenLocation, ScreenAcelerometer } from "../screens"
import { colors } from '../styles/colors';
import { Ionicons, Octicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
type TabParamList = {
  Perfil: undefined
  Camera: undefined
  Location: undefined
  Acelerometro: undefined
}
type TabScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'Perfil'>
export type TabTypes = {
  navigation: TabScreenNavigationProp
}
export function TabNavigation() {
  const Tab = createBottomTabNavigator<TabParamList>();
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.laranjaescuro
        },
        headerTintColor: colors.white,
        tabBarActiveBackgroundColor: colors.laranjinha,
        tabBarActiveTintColor: colors.white
      }}
    >
      <Tab.Screen name="Perfil" component={ScreenPerfil}
        options={{
          tabBarIcon: () => (
            <Ionicons name='person' color={colors.laranjaescuro} size={24} />
          )
        }}
      />
      <Tab.Screen name="Camera" component={ScreenCamera}
        options={{
          tabBarIcon: () => (
            <Octicons name="device-camera" size={24} color={colors.laranjaescuro} />
          )
        }}
      />
      <Tab.Screen name='Location' component={ScreenLocation}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="location-on" size={24} color={colors.laranjaescuro} />
          )
        }}
      />
      <Tab.Screen name='Acelerometro' component={ScreenAcelerometer}
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="car-alt" size={24} color={colors.laranjaescuro} />
          )
        }}
      />

    </Tab.Navigator >

  );
}