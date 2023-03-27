import { TouchableOpacity } from 'react-native';
import { styles } from './styles';
export interface IBSlider {
    onPresI: () => void
    page: boolean
}
export function ButtonSlider({ onPresI, page }: IBSlider) {
    return (
        <TouchableOpacity style={page? styles.outra: styles.ball} onPress={onPresI} />
    )
}