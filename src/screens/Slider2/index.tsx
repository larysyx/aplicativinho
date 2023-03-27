import { FlatList, ImageBackground, View } from 'react-native';
import { Ipage } from '../../../App'
import {
    ComponentButtonSlider, ComponentListMaker, ComponentTitleSlider
} from '../../components';
import { styles } from './styles';
export function Slider2({ setPageI }: Ipage) {
    const slide2 = require("../../assets/slide2.png")
    const slide2Texts = [
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
                  data={slide2Texts}
                  renderItem={({ item }) =>
                    <ComponentListMaker key={item.id} textMarker={item.text} />
            }   
            keyExtractor={(item) => item.id} 
            />     
            </View>
            <View style={styles.buttonSlider}>
                <ComponentButtonSlider onPresI={() => setPageI(1)} page={false} />
                <ComponentButtonSlider onPresI={() => setPageI(2)} page={true} />
                <ComponentButtonSlider onPresI={() => setPageI(3)} page={false} />
                <ComponentButtonSlider onPresI={() => setPageI(4)} page={false} />
            </View>
        </ImageBackground>
    );
}