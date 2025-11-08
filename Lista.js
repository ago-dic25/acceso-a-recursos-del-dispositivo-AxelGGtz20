export default function Lista() { 
  const [contador, setContador] = useState(0);
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  
  function saludarAlumno() {
    if (nombre.trim() === "") {
      setMensaje("Escribe tu nombre...");
    } else {
      setMensaje("Hola " + nombre);
    }
  }

  function contadorCaracteres() {
    setMensaje("Tu nombre tiene " + nombre.length + " caracteres");
  }
  function emojiPorLongitud() {
    if (nombre.length === 0) {
      setMensaje("🎃");
    } else if (nombre.length > 1 && nombre.length < 10) {
      setMensaje("👻👻👻👻👻");
    } else {
      setMensaje("🧛🧛🧛🧛🧛🧛🧛🧛🧛🧛🧛🧛");
    }
  }

  return (
    <View style={styles.container}>
      <Text>{mensaje}</Text>
      <TextInput
        placeholder='Escribe tu nombre'
        value = {nombre}
        onChangeText = {setNombre}
      />
      <Button title = "Mostrar Mensaje" onPress={saludarAlumno}></Button>
      <Button title = "Contar caracteres" onPress={contadorCaracteres}></Button>
      <Button title = "Emoji por longitud" onPress={emojiPorLongitud}></Button>
      <Button title = "Limpiar" onPress={()=> {setNombre(""); setMensaje(""); }}></Button>
      <Text>Haz hecho clic {contador} veces </Text>
      <Button title = "Aumentar" onPress={()=> setContador(contador + 1)}></Button>
      <StatusBar style="auto" />
    </View>
  );
}