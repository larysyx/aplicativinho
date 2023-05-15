import { Camera, CameraType } from 'expo-camera';
import { Component, useRef, useState } from 'react';
import { Button, StyleSheet, Text, Image, View } from 'react-native';
import { ComponentButtoninterface } from '../../components';
import { styles } from './styles';

interface Iphoto {
  height: string
  uri: string
  width: string
}

export function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [photo, setPhoto] = useState<Iphoto>()
  const ref= useRef(null)

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  async function takePicture() {
    if(ref.current) {
      const picture = await ref.current.takePictureAsync()
      setPhoto(picture)
    }
  }

  return (
    <View style={styles.container}>
      <ComponentButtoninterface title='Flip' type="laranjinha" onPresI={toggleCameraType}/>
      <Camera style={styles.camera} type={type} ref={ref} ratio='1:1' />
      <ComponentButtoninterface title='Foto' type="laranjinha" onPresI={takePicture}/>
      {photo && photo.uri && (
        <Image source={{ uri:photo.uri }} style={styles.img} />
      )}
    </View>
  );
}