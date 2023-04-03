import { FlatList, ImageBackground, View } from 'react-native';
import { Ipage } from '../../../App'
import {
    ComponentButtonSlider, ComponentListMaker, ComponentTitleSlider
} from '../../components';
import { styles } from './styles';
export function Slider1({ setPageI }: Ipage) {
    const slide1 = require("../../assets/slide1.png")
    const slide1Texts = [
        { id: '1', text: 'Mais acessados'},
        { id: '2', text: 'Quentes'},
        { id: '3', text: 'Gelados'},
    ]
    return (
        <ImageBackground source={slide1} style={styles.container} >
            <View style={styles.panel}>
                <ComponentTitleSlider titleI='Bolos, doces e sobremesas' />
                <FlatList
                  data={slide1Texts}
                  renderItem={({ item }) =>
                    <ComponentListMaker key={item.id} textMarker={item.text} />
            }   
            keyExtractor={(item) => item.id} 
            />     
        </View>
        <View style={styles.buttonSlider}>
            <ComponentButtonSlider onPresI={() => setPageI(1)} page={true} />
            <ComponentButtonSlider onPresI={() => setPageI(2)} page={false} />
            <ComponentButtonSlider onPresI={() => setPageI(3)} page={false} />
            <ComponentButtonSlider onPresI={() => setPageI(4)} page={false} />
            <ComponentButtonSlider onPresI={() => setPageI(5)} page={false} />
        </View>
    </ImageBackground>
   );
}