import { TouchableOpacity } from 'react-native';
import { styles } from './styles';
export interface IBSlider {
    onPresI: () => void
}
export function ButtonSlider({ onPressI}: IBSlider) {
    return (
        <TouchableOpacity style={styles.ball} onPress={onPressI} />
    )
}