import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    camera: {
      flex: 10,
      justifyContent: "flex-end",
      alignItems: "center",
      marginBottom: 15
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
    img: {
      width: Dimensions.get('window').width *0.8,
      height: Dimensions.get('window').width *0.8,
    },
    sorriso: {
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });
  