import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import { Component, useRef, useState } from 'react';
import { Button, StyleSheet, Text, Image, View, Alert } from 'react-native';
import { ComponentButtonInterface } from '../../components';
import { ComponentButtonTakePicture } from '../../components';
import { styles } from './styles';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

export function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const [permissionCamera, requestPermissionCamera] = Camera.useCameraPermissions();
  const [permissionMedia, requestPermissionMedia] = MediaLibrary.usePermissions();
  const [photo, setPhoto] = useState<CameraCapturedPicture | ImagePicker.ImagePickerAsset>();
  const ref= useRef<Camera>(null)
  const [takePhoto, setTakePhoto] = useState(false)

  if (!permissionCamera) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permissionCamera.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Precisa de sua permissão para acessar a camera</Text>
        <Button onPress={requestPermissionCamera} title="permita o acesso" />
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

  if (!permissionMedia) {
    return <View />;
  }

  if (!permissionMedia.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Precisa de sua permissão para salvar a imagem</Text>
        <Button onPress={requestPermissionMedia} title="permita o acesso" />
      </View>
    );
  }

  async function savePhoto() {
    const asset = await MediaLibrary.createAssetAsync(photo!.uri)
    MediaLibrary.createAlbumAsync("Images", asset, false)
    Alert.alert("Imagem salva com sucesso!")    
  }

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [9,16],
      quality: 10
    })
    if (!result.canceled) {
      setPhoto(result.assets[0])
    }
  }

  return (
    <View style={styles.container}>
      <ComponentButtonInterface title='Gire' type="laranjinha" onPresI={toggleCameraType}/>
      <Camera style={styles.camera} type={type} ref={ref} ratio='1:1'>
        <ComponentButtonTakePicture onPressIn={takePicture}/>
      </Camera>

      
      {photo && photo.uri && (
        <Image source={{ uri:photo.uri }} style={styles.img} />
      )}
      <ComponentButtonInterface title='Salvar foto' type="laranjinha" onPresI={savePhoto}/>
      <ComponentButtonInterface title='Abrir foto' type="laranjinha" onPresI={pickImage}/>
    </View>
  );
}