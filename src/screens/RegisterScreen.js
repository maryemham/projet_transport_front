import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { registerUser } from "../api/authApi";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (pwd) => pwd.length >= 6;

  const handleRegister = async () => {
    // Validation
    if (!email || !motDePasse || !nom || !prenom) {
      Alert.alert("Erreur", "Tous les champs sont requis");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Erreur", "Email invalide");
      return;
    }
    if (!validatePassword(motDePasse)) {
      Alert.alert("Erreur", "Le mot de passe doit faire au moins 6 caractères");
      return;
    }

    setLoading(true);
    try {
      const res = await registerUser(email, motDePasse, nom, prenom);
      const token = res.data.token || res.data; // selon ton backend

      Alert.alert("Succès", "Inscription réussie ! Vérifiez votre email.");
      navigation.navigate("Verify", { token });
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Échec de l'inscription. Réessayez.";
      Alert.alert("Erreur", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />

        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          value={motDePasse}
          onChangeText={setMotDePasse}
          secureTextEntry
          editable={!loading}
        />

        <Text style={styles.label}>Nom</Text>
        <TextInput
          style={styles.input}
          value={nom}
          onChangeText={setNom}
          autoCapitalize="words"
          editable={!loading}
        />

        <Text style={styles.label}>Prénom</Text>
        <TextInput
          style={styles.input}
          value={prenom}
          onChangeText={setPrenom}
          autoCapitalize="words"
          editable={!loading}
        />

        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="small" color="#0066cc" />
          ) : (
            <Button title="S'inscrire" onPress={handleRegister} color="#0066cc" />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  form: { padding: 20 },
  label: { fontSize: 16, marginBottom: 8, fontWeight: "600", color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  buttonContainer: { marginTop: 10 },
});