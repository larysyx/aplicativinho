import { FlatList, ImageBackground, View } from 'react-native';
import { Ipage } from '../../../App'
import {
    ComponentButtonSlider, ComponentListMaker, ComponentTitleSlider
} from '../../components';
import { styles } from './styles';
export function Slider1({ setPageI }: Ipage) {
    const slide1 = require("../../assets/slide2.png")
    const slide1Texts = [
        { id: '1', text: 'Mais acessados'},
        { id: '2', text: 'Massas'},
        { id: '3', text: 'Carnes'},
        { id: '4', text: 'Lanches'},
        { id: '5', text: 'Frutos do mar'},
    ]
    return (
        <ImageBackground source={slide2} style={styles.container} >
            <View style={styles.panel}>
                <ComponentTitleSlider titleI='Receitas salgadas' />
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
        </ImageBackground>
    );
}