import { Text, View } from 'react-native';
import * as Location from 'expo-location';
import React, { useEffect, useState, useRef } from 'react';
import MapView, { Region, Marker, Polyline } from "react-native-maps";
import { styles } from './styles';
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import { colors } from '../../styles/colors';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { API_GOOGLE } from '@env'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
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
    const [destination, setDestination] = useState<Region | null>(null)
    const mapRef = useRef<MapView>(null)

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

    async function handleDestination(data: GooglePlaceData, details: GooglePlaceDetail | null) {
        if (details) {
            setDestination({
                latitude: details?.geometry.location.lat,
                longitude: details?.geometry.location.lng,
                latitudeDelta: 0.004,
                longitudeDelta: 0.004
            })
            if (marker) {
                setMarker([...marker, {
                    latitude: details?.geometry.location.lat,
                    longitude: details?.geometry.location.lng,
                    latitudeDelta: 0.004,
                    longitudeDelta: 0.004
                }])
            }
        }
    }

    let text = 'Localizando...';
    if (errorMsg) {
        text = errorMsg
    } else if (location) {
        text = JSON.stringify(location);
    } else if (destination) {
        text = JSON.stringify(destination);
    }
    return (
        <View style={styles.container}>
            {region ? (
                <>
                    <GooglePlacesAutocomplete
                        styles={{ container: styles.searchContainer, textInput: styles.searchInput }}
                        placeholder="Destino"
                        fetchDetails={true}
                        GooglePlacesDetailsQuery={{ fields: "geometry" }}
                        enablePoweredByContainer={false}
                        query={{
                            key: API_GOOGLE,
                            language: 'pt-BR'
                        }}
                        onFail={setErrorMsg}
                        onPress={handleDestination}
                    />
                    <MapView region={region} style={styles.map} showsUserLocation={true}>
                        {marker && marker.map((i) => (
                            <Marker key={i.latitude} coordinate={i}>
                                <Entypo name="location-pin" size={30} color={colors.vermelho} />
                            </Marker>
                        ))}
                        {coords && <Polyline
                            coordinates={coords}
                            strokeColor={colors.azul}
                            strokeWidth={7}
                        />}
                        {destination && (
                            <MapViewDirections
                                origin={region}
                                destination={destination}
                                apikey={API_GOOGLE}
                                strokeColor={colors.black}
                                strokeWidth={6}
                                onReady={(result) => {
                                    mapRef.current?.fitToCoordinates(result.coordinates, {
                                        edgePadding: {
                                            top: 24,
                                            bottom: 24,
                                            left: 24,
                                            right: 24
                                        }
                                    })
                                }}
                            />
                        )}
                    </MapView>
                </>
            ) : (
                <Text style={styles.paragraph}>{text}</Text>
            )}
        </View>
    );
}