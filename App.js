import React, { useState, useRef, useEffect } from "react";
import { View, Text, Button, Image, StyleSheet, Alert } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaPermission, setHasMediaPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();

      setHasCameraPermission(cameraStatus === "granted");
      setHasMediaPermission(mediaStatus === "granted");
    })();
  }, []);

  const requestAllPermissions = async () => {
    const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
    const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();

    setHasCameraPermission(cameraStatus === "granted");
    setHasMediaPermission(mediaStatus === "granted");
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo.uri);

      if (hasMediaPermission) {
        await MediaLibrary.saveToLibraryAsync(photo.uri);
        Alert.alert("Foto guardada", "La imagen se guardó en tu galería.");
      } else {
        Alert.alert("No hay permiso", "No se pudo guardar la foto en la galería.");
      }
    }
  };

  if (hasCameraPermission === null || hasMediaPermission === null) {
    return (
      <View style={styles.center}>
        <Text>Solicitando permisos...</Text>
      </View>
    );
  }

  if (!hasCameraPermission || !hasMediaPermission) {
    return (
      <View style={styles.center}>
        <Text style={{ marginBottom: 10 }}>Permisos denegados</Text>
        <Button title="Volver a pedir permisos" onPress={requestAllPermissions} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={CameraType.back} ref={cameraRef} />
      <View style={styles.controls}>
        <Button title="Tomar foto" onPress={takePicture} />
      </View>
      {photo && (
        <View style={styles.preview}>
          <Text style={styles.text}>Vista previa:</Text>
          <Image source={{ uri: photo }} style={styles.image} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  camera: { flex: 3 },
  controls: { flex: 0.5, justifyContent: "center", alignItems: "center", backgroundColor: "#222" },
  preview: { flex: 2, alignItems: "center", backgroundColor: "#111" },
  text: { color: "#fff", marginTop: 10, fontSize: 16 },
  image: { width: 300, height: 400, marginTop: 10 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
