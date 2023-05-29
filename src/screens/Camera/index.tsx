import { Camera, CameraCapturedPicture, CameraType, FaceDetectionResult } from 'expo-camera';
import { Component, useRef, useState } from 'react';
import { Button, StyleSheet, Text, Image, View, Alert, TouchableOpacity } from 'react-native';
import { ComponentButtonInterface } from '../../components';
import { ComponentButtonTakePicture } from '../../components';
import { styles } from './styles';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as FaceDetector from 'expo-face-detector';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';

export function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const [permissionCamera, requestPermissionCamera] = Camera.useCameraPermissions();
  const [permissionMedia, requestPermissionMedia] = MediaLibrary.usePermissions();
  const [photo, setPhoto] = useState<CameraCapturedPicture | ImagePicker.ImagePickerAsset>();
  const ref= useRef<Camera>(null)
  const [takePhoto, setTakePhoto] = useState(false);
  const [permissionQrCode, requestPermissionQrCode] = BarCodeScanner.usePermissions();
  const [scanned, setScanned] = useState(false);
  const [face, setFace] = useState<FaceDetector.FaceFeature>()

  if (!permissionCamera || !permissionMedia || !permissionQrCode) {
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
      setTakePhoto(false)
    }
  }

  if (!permissionMedia) {
    return <View/>;
  }

  if (!permissionMedia.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Precisa de sua permissão para salvar a imagem</Text>
        <Button onPress={requestPermissionMedia} title="permita o acesso" />
      </View>
    );
  }

  if (!permissionQrCode) {
    return <View/>
  }

  if (!permissionQrCode.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Precisa de sua permissão ler o QRCode</Text>
        <Button onPress={requestPermissionQrCode} title="permita a leitura" />
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
      aspect: [3,4],
      quality: 1
    })
    if (!result.canceled) {
      setPhoto(result.assets[0])
    }
  }

  const handleBarCodeScanned = ({ type, data}: BarCodeScannerResult) => {
    setScanned(true);
    alert(data);
  };

  const handleFacesDetected = ({ faces }: FaceDetectionResult): void => {
    if (faces.length > 0) {
      const faceDetect = faces[0] as FaceDetector.FaceFeature
      setFace(faceDetect)
    } else {
      setFace(undefined)
    }
  }

  return (
    <View style={styles.container}>
  
    {takePhoto ? (
      <>
      <Camera style={styles.camera} type={type} ref={ref} ratio='1:1'
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      onFacesDetected={handleFacesDetected}
      faceDetectorSettings={{
        mode: FaceDetector.FaceDetectorMode.accurate,
        detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
        runClassifications: FaceDetector.FaceDetectorClassifications.all,
        minDetectionIntervall: 1000,
        tracking: true,
      }}
      >
        <ComponentButtonInterface title='Gire' type="laranjinha" onPresI={toggleCameraType}/>
        <ComponentButtonTakePicture onPressIn={takePicture}/>
        <ComponentButtonInterface title='Escaneie novamente' type="laranjinha" onPresI={()=> setScanned(true)}/>
      </Camera>
      <View style={styles.sorriso}>
        {face && face.smilingProbability && face.smilingProbability > 0.5 ? (
          <Text>Sorrindo</Text>
        ) : (
          <Text>Não</Text>
        )}
      </View>
      </>
    ) : (
      <>
      {photo && photo.uri && (
        <Image source={{ uri:photo.uri }} style={styles.img} />
      )}
      <ComponentButtonInterface title='Tirar foto' type="laranjinha" onPresI={()=> setTakePhoto(true)}/>
      <ComponentButtonInterface title='Salvar foto' type="laranjinha" onPresI={savePhoto}/>
      <ComponentButtonInterface title='Abrir foto' type="laranjinha" onPresI={pickImage}/>
      </>
   )}
   
   </View>

);
}