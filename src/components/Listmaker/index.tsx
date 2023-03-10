import { Text, View } from 'react-native';
import { Maker } from '../Maker';
import { styles } from './styles';
export interface ITexyMarker {
    textMarker: string
}
export function ListMarker({ textMarker }: ITexyMarker) {
    return (
        <View style={styles.listMaker}>
            <Maker />
            <Text style={styles.textMarker} >{textMarker}</Text>
        </View>
    )
}