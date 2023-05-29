import React from "react";
import { View, KeyboardAvoidingView, Text, TextInput  } from "react-native";
import { styles } from "./styles";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from "../../styles/colors";
import { ComponentButtonInterface } from "../../components";
import { LoginTypes } from "../../navigations/login.navigation"

export function Login({navigation}: LoginTypes){
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView>
                <Text style={styles.title}> Login </Text>
                <View style={styles.formRow}>
                <MaterialCommunityIcons name="email-outline" style= {styles.icon} />
                    <TextInput
                        placeholder="E-mail"
                        placeholderTextColor={colors.cinza}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                        />
                </View>
                <View style={styles.formRow}>
                <MaterialIcons name="lock-outline" style= {styles.icon} />
                    <TextInput
                        placeholder="Senha"
                        placeholderTextColor={colors.cinza}
                        secureTextEntry={true}
                        autoCapitalize="none"
                        style={styles.input}
                        />
                </View>
                <ComponentButtonInterface title="Login" type='lescuro' onPresI={() => { navigation.navigate('Tab') }} />
                <ComponentButtonInterface title="Cadastrar" type='laranjinha' onPresI={() => { navigation.navigate('Cadastrar') }} />
            </KeyboardAvoidingView>
        </View>
    )
}
