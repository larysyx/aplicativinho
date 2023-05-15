import { View, Text } from "react-native";
import { styles } from "./styles";
import { ComponentButtoninterface } from "../../components";
import { TabTypes } from "../../navigations/tab.navigation";

export function Perfil({ navigation }: TabTypes) {
    function handleVoltar() {
        const tab = navigation.getParent()
        tab?.goBack()
    }
    return (
        <View style={styles.container}>
            <Text>Perfil</Text>
            <ComponentButtoninterface title="Voltar" type="lescuro" onPresI={handleVoltar} />
        </View>
    )
}