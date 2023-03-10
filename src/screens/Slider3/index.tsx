import { FlatList, ImageBackground, View } from 'react-native';
import { Ipage } from '../../../App'
import {
    ComponentButtonSlider, ComponentListMaker, ComponentTitleSlider
} from '../../components';
import { styles } from './styles';
export function Slider1({ setPageI }: Ipage) {
    const slide1Texts = [
        { id: '1', text: 'Favoritos do público'},
        { id: '2', text: 'Geladas'},
        { id: '3', text: 'Quentes'},
        { id: '4', text: 'Alcoólicas'},
    ]
    return (
        <View style={styles.container} >
            <View style={styles.panel}>
                <ComponentTitleSlider titleI='Bebidas' />
                <FlatList
                  data={slide1Texts}S
                  renderItem={({ item }) =>
                    <ComponentListMaker key={item.id} textMarker={item.text} />
            }   
            keyExtractor={(item) => item.id} 
            />     
            </View>
            <View style={styles.buttonSlider}>
                <ComponentButtonSlider onPresI={() => setPageI(1)} />
                <ComponentButtonSlider onPresI={() => setPageI(2)} />
                <ComponentButtonSlider onPresI={() => setPageI(3)} />
                <ComponentButtonSlider onPresI={() => setPageI(4)} />
            </View>
        </View>
    );
}