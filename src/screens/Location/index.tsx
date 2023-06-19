import { Text, View } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { API_GOOGLE } from '@env'
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import MapView, { Region, Marker, Polyline } from "react-native-maps";
import { styles } from './styles';
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import { colors } from '../../styles/colors';
type ICoords = {
    latitude: number
    longitude: number
}

export function LocationScreen() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [region, setRegion] = useState<Region>()
    const [marker, setMarker] = useState<Region[]>()
    const [coords, setCoords] = useState<ICoords[]>([])

    useEffect(() => {
        let subcription: Location.LocationSubscription
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('A permissão para acessar a localização foi negada');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.009,
                longitudeDelta: 0.009
            })
            setMarker([{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.009,
                longitudeDelta: 0.009   
            }])
            subcription = await Location.watchPositionAsync({
                accuracy: Location.LocationAccuracy.High,
                timeInterval: 1000,
                distanceInterval: 1
            }, (location) => {
                setCoords((prevState) => [...prevState, location.coords])
            });
        })();
        return () => { 
            if (subcription) {
                subcription.remove()
            }
        }
    }, []);

    let text = 'Localizando..';
    if (errorMsg) {
        text = errorMsg
    } else if (location) {
        text = JSON.stringify(location);
    }
    return (
        <View style={styles.container}>
            {region ? (
                <MapView region={region} style={styles.map} showsUserLocation={true}>
                    {marker && marker.map((i)=> (
                        <Marker key={i.latitude} coordinate={i} />
                    ))}
                    {coords && <Polyline
                    coordinates={coords}
                    strokeColor={colors.azul}
                    strokeWidth={7}
                    />}
                </MapView>
            ) : (
                <Text style={styles.paragraph}>{text}</Text>
            )}
        </View>
    );
}