import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { questions } from "../questions";

export default function ResultScreen({ route, navigation }) {
  const { score } = route.params;
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    loadHighScore();
  }, []);

  const loadHighScore = async () => {
    const saved = await AsyncStorage.getItem("HIGH_SCORE");
    const previousHigh = saved ? parseInt(saved) : 0;

    if (score > previousHigh) {
      await AsyncStorage.setItem("HIGH_SCORE", score.toString());
      setHighScore(score);
    } else {
      setHighScore(previousHigh);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Completed!</Text>
      <Text>Your Score: {score} / {questions.length}</Text>
      <Text>Highest Score: {highScore}</Text>

      <Button title="Back to Home" onPress={() => navigation.popToTop()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, marginBottom: 20 },
});