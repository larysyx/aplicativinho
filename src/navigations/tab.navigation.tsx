import React from 'react';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ScreenPerfil } from "../screens"
import { colors } from '../styles/colors';
import { Ionicons } from '@expo/vector-icons';
type TabParamList = {
  Perfil: undefined
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
                backgroundColor: colors.laranjinha
            },
            headerTintColor: colors.white,
            tabBarActiveBackgroundColor: colors.laranjinha,
            tabBarActiveTintColor: colors.white
        }}
        >
            <Tab.Screen name="Perfil" component={ScreenPerfil}
            options={{
                tabBarIcon:() =>(
                    <Ionicons name='person' color={colors.white} size={24} />
                )
            }}
            />
    </Tab.Navigator>
  );
}