import React from "react";
import { View, KeyboardAvoidingView, Text, TextInput } from "react-native";
import { styles } from "./styles";
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from "../../styles/colors";
import { ComponentButtoninterface } from "../../components";
import { LoginTypes } from "../../navigations/login.navigation"

export function Cadastrar({navigation}: LoginTypes){
    return (
             <View style={styles.container}>
            <KeyboardAvoidingView>
                <Text style={styles.title}> Cadastre-se </Text>
                <View style={styles.formRow}>
                <Octicons name="person" style= {styles.icon} />
                    <TextInput
                        placeholder="Nome"
                        placeholderTextColor={colors.cinza}
                        autoCapitalize="none"
                        style={styles.input}
                        />
                </View>
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
                <ComponentButtoninterface title="Salvar" type='lescuro' onPresI={() => { navigation.navigate('Drawer') }} />
                <ComponentButtoninterface title="Voltar" type='laranjinha' onPresI={() => { navigation.navigate('Login') }} />
            </KeyboardAvoidingView>
            </View>
    )
}
