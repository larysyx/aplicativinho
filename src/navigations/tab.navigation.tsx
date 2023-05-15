import React from 'react';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ScreenCamera, ScreenPerfil } from "../screens"
import { colors } from '../styles/colors';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
type TabParamList = {
  Perfil: undefined
  Camera: undefined
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
                tabBarIcon:() =>(
                    <Ionicons name='person' color={colors.laranjaescuro} size={24} />
                )
            }}
            />
            <Tab.Screen name="Camera" component={ScreenCamera}
              options={{
                tabBarIcon: () => (
                  <Feather name="camera" color={colors.laranjaescuro} size={24} />
                )
              }}
            
            />
    </Tab.Navigator>
  );
}