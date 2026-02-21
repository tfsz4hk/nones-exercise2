import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Page() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Nones Quiz</Text>
        <Text style={styles.subtitle}>
          Set up your questions in Quiz Settings, then take the quiz in Preview.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(tabs)/preview")}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => router.push("/(tabs)/settings")}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonTextSecondary}>Quiz Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f8fafc",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 480,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#64748b",
    lineHeight: 26,
    textAlign: "center",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  buttonSecondary: {
    backgroundColor: "transparent",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e2e8f0",
  },
  buttonTextSecondary: {
    color: "#475569",
    fontSize: 18,
    fontWeight: "600",
  },
});
