import { FlatList, ImageBackground, View } from 'react-native';
import { Ipage } from '../../../App'
import {
    ComponentButtonSlider, ComponentListMaker, ComponentTitleSlider
} from '../../components';
import { styles } from './styles';
export function Slider4({ setPageI }: Ipage) {
    const slide4Texts = [
        { id: '1', text: 'Veganas'},
        { id: '2', text: 'Fitness'},
        { id: '3', text: 'Para quem tem restrições'},
    ]
    return (
        <View style={styles.container} >
            <View style={styles.panel}>
                <ComponentTitleSlider titleI='Receitas especiais' />
                <FlatList
                  data={slide4Texts}
                  renderItem={({ item }) =>
                    <ComponentListMaker key={item.id} textMarker={item.text} />
            }   
            keyExtractor={(item) => item.id} 
            />     
            </View>
            <View style={styles.buttonSlider}>
                <ComponentButtonSlider onPresI={() => setPageI(1)} page={false} />
                <ComponentButtonSlider onPresI={() => setPageI(2)} page={false} />
                <ComponentButtonSlider onPresI={() => setPageI(3)} page={false} />
                <ComponentButtonSlider onPresI={() => setPageI(4)} page={true} />
                <ComponentButtonSlider onPresI={() => setPageI(5)} page={false} />
            </View>
        </View>
    );
}