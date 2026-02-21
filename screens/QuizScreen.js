import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { questions } from "../questions";

export default function QuizScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQuestion = questions[currentIndex];

  const handleSelect = (choice) => {
    setAnswers({ ...answers, [currentQuestion.id]: choice });
  };

  const calculateScore = () => {
    let score = 0;

    questions.forEach((q) => {
      if (Array.isArray(q.answer)) {
        if (
          JSON.stringify(q.answer.sort()) ===
          JSON.stringify([answers[q.id]].sort())
        ) {
          score++;
        }
      } else {
        if (answers[q.id] === q.answer) {
          score++;
        }
      }
    });

    return score;
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const score = calculateScore();
      navigation.navigate("Result", { score });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {currentIndex + 1}. {currentQuestion.question}
      </Text>

      {Object.entries(currentQuestion.choices).map(([key, value]) => (
        <TouchableOpacity
          key={key}
          style={[
            styles.choice,
            answers[currentQuestion.id] === key && styles.selected,
          ]}
          onPress={() => handleSelect(key)}
        >
          <Text>{key}. {value}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.buttons}>
        <TouchableOpacity onPress={handlePrevious}>
          <Text style={styles.nav}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNext}>
          <Text style={styles.nav}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  question: { fontSize: 18, marginBottom: 15 },
  choice: {
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
  },
  selected: { backgroundColor: "#d0e8ff" },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  nav: { fontSize: 16, color: "blue" },
});