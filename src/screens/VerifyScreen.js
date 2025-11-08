import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { verifyAccount } from "../api/authApi";

export default function VerifyScreen({ route, navigation }) {
  const { token: initialToken } = route.params || {};
  const [token, setToken] = useState(initialToken || "");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!token) {
      Alert.alert("Erreur", "Entrez le code de vérification");
      return;
    }

    setLoading(true);
    try {
      await verifyAccount(token);
      Alert.alert("Succès", "Compte vérifié ! Vous pouvez vous connecter.");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Code invalide ou expiré";
      Alert.alert("Erreur", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Vérification du compte</Text>
        <Text style={styles.info}>
          Un code a été envoyé à votre email. Entrez-le ci-dessous.
        </Text>

        <TextInput
          style={styles.input}
          value={token}
          onChangeText={setToken}
          placeholder="Code de vérification"
          keyboardType="number-pad"
          editable={!loading}
        />

        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="small" color="#0066cc" />
          ) : (
            <Button title="Vérifier" onPress={handleVerify} color="#0066cc" />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  form: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  info: { fontSize: 16, color: "#555", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 14,
    marginBottom: 20,
    backgroundColor: "#fff",
    fontSize: 18,
    textAlign: "center",
    letterSpacing: 4,
  },
  buttonContainer: { marginTop: 10 },
});