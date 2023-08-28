import React, { useEffect, useState } from "react";
import { View, KeyboardAvoidingView, Text, TextInput, Alert } from "react-native";
import { styles } from "./styles";
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from "../../styles/colors";
import { ComponentButtonInterface, ComponentLoading } from "../../components";
import { LoginTypes } from "../../navigations/login.navigation"
import { IRegister } from "../../services/data/User";
import { apiUser } from "../../services/data";
import { AxiosError } from "axios";
export interface IErrorApi {
    errors: {
        rule: string
        field: string
        message: string
    }[]
}
export function Cadastrar({ navigation }: LoginTypes) {
    const [data, setData] = useState<IRegister>()
    const [isloading, setIsLoading] = useState(true)
    function handleChange(item: IRegister) {
        setData({ ...data, ...item })
    }
    async function handleRegister() {
        try {
            setIsLoading(true)
            if (data?.name && data.email && data.password) {
                const response = await apiUser.register(data)
                Alert.alert(`${response.data.name} cadastrado!!!`)
                navigation.navigate('Login')
            } else {
                Alert.alert("Preencha todos os campos!!!")
            }
        } catch(error) {
            const err = error as AxiosError
            const errorData = err.response?.data as IErrorApi
            let message = ""
            if (errorData) {
                for (const iterator of errorData.errors) {
                    message = `${message} ${iterator.message}`
                }
            }
            Alert.alert(message)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 500)
    }, [])

    return (
        <>
            {isloading ? (
                <ComponentLoading />
            ) : (
                <View style={styles.container}>
                    <KeyboardAvoidingView>
                        <Text style={styles.title}> Cadastre-se </Text>
                        <View style={styles.formRow}>
                            <Octicons name="person" style={styles.icon} />
                            <TextInput
                                placeholder="Nome"
                                placeholderTextColor={colors.cinza}
                                autoCapitalize="none"
                                style={styles.input}
                                onChangeText={(i) => handleChange({ name: i })}
                            />
                        </View>
                        <View style={styles.formRow}>
                            <MaterialCommunityIcons name="email-outline" style={styles.icon} />
                            <TextInput
                                placeholder="E-mail"
                                placeholderTextColor={colors.cinza}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                style={styles.input}
                                onChangeText={(i) => handleChange({ email: i })}
                            />
                        </View>
                        <View style={styles.formRow}>
                            <MaterialIcons name="lock-outline" style={styles.icon} />
                            <TextInput
                                placeholder="Senha"
                                placeholderTextColor={colors.cinza}
                                secureTextEntry={true}
                                autoCapitalize="none"
                                style={styles.input}
                                onChangeText={(i) => handleChange({ password: i })}
                            />
                        </View>
                        <ComponentButtonInterface title="Salvar" type='lescuro' onPresI={handleRegister} />
                        <ComponentButtonInterface title="Voltar" type='laranjinha' onPresI={() => { navigation.navigate('Login') }} />
                    </KeyboardAvoidingView>
                </View>
            )}
        </>
    );
}