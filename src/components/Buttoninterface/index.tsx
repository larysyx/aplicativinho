import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native';
import { styles } from './styles';
export interface IBInterface extends TouchableOpacityProps {
    onPresI: () => void
    title: string
    type: 'laranjinha' | 'lecuro' | 'black'
 
}
export function Buttoninterface({ onPresI, title, type, ...rest }: IBInterface) {
    return (
        <TouchableOpacity style={ 
            type == 'lecuro' ? styles.buttonLescuro :
                type == 'laranjinha' ? styles.buttonLclaro:
                    styles.buttonblack
         } onPress={onPresI} 
            {...rest}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
        
    )
}