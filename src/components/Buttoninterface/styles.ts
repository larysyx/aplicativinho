import { StyleSheet} from 'react-native';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
    buttonLescuro: {
        backgroundColor: colors.laranjaescuro,
        borderRadius: 5,
        margin: 10
    },

    buttonLclaro: {
        backgroundColor: colors.laranjinha,
        borderRadius: 5,
        margin: 10
    },

    buttonblack: {
        backgroundColor: colors.black,
        borderRadius: 5,
        margin: 10
    },

    text: {
        color: colors.white,
        fontWeight: "bold",
        padding: 10,
        fontSize: 15,
        textAlign: "center"
    }
});

