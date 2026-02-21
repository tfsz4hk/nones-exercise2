import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { QuizContext } from "../../context/QuizContext";

const CHOICE_LETTERS = ["A", "B", "C", "D"] as const;

export default function Settings() {
  const { quizQuestions, setQuizQuestions, timer, setTimer } =
    useContext(QuizContext);

  const [newQuestion, setNewQuestion] = useState("");
  const [choices, setChoices] = useState<Record<string, string>>({
    A: "",
    B: "",
    C: "",
    D: "",
  });
  const [correctAnswer, setCorrectAnswer] = useState<string>("A");

  const setChoice = (letter: string, value: string) => {
    setChoices((prev) => ({ ...prev, [letter]: value }));
  };

  const addQuestion = () => {
    const choicesFiltered: Record<string, string> = {};
    CHOICE_LETTERS.forEach((letter) => {
      const text = (choices[letter] || "").trim();
      if (text) choicesFiltered[letter] = text;
    });

    if (Object.keys(choicesFiltered).length === 0) return;
    if (!choicesFiltered[correctAnswer]) return; // correct answer must be one of the choices

    const questionObj = {
      id: Date.now(),
      question: newQuestion.trim(),
      choices: choicesFiltered,
      answer: correctAnswer,
    };

    setQuizQuestions([...quizQuestions, questionObj]);
    setNewQuestion("");
    setChoices({ A: "", B: "", C: "", D: "" });
    setCorrectAnswer("A");
  };

  const deleteQuestion = (id: number) => {
    setQuizQuestions(quizQuestions.filter((q) => q.id !== id));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.label}>Set Timer (seconds)</Text>
        <TextInput
          keyboardType="numeric"
          value={timer.toString()}
          onChangeText={(text) => setTimer(Number(text) || 0)}
          style={styles.input}
        />

        <Text style={styles.sectionTitle}>Add Question</Text>
        <TextInput
          placeholder="Question text"
          value={newQuestion}
          onChangeText={setNewQuestion}
          style={styles.input}
        />

        <Text style={styles.label}>Choices (fill at least one; correct one below)</Text>
        {CHOICE_LETTERS.map((letter) => (
          <View key={letter} style={styles.choiceRow}>
            <Text style={styles.choiceLabel}>{letter}.</Text>
            <TextInput
              placeholder={`Choice ${letter}`}
              value={choices[letter]}
              onChangeText={(text) => setChoice(letter, text)}
              style={[styles.input, styles.choiceInput]}
            />
          </View>
        ))}

        <Text style={styles.label}>Correct answer</Text>
        <View style={styles.correctRow}>
          {CHOICE_LETTERS.map((letter) => (
            <TouchableOpacity
              key={letter}
              style={[
                styles.correctBtn,
                correctAnswer === letter && styles.correctBtnSelected,
              ]}
              onPress={() => setCorrectAnswer(letter)}
            >
              <Text
                style={[
                  styles.correctBtnText,
                  correctAnswer === letter && styles.correctBtnTextSelected,
                ]}
              >
                {letter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button title="Add Question" onPress={addQuestion} />
      </ScrollView>

      <View style={styles.listHeader}>
        <Text style={styles.sectionTitle}>Saved questions</Text>
      </View>
      <FlatList
        data={quizQuestions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>{item.question}</Text>
            <TouchableOpacity onPress={() => deleteQuestion(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  scroll: { flexGrow: 0, maxHeight: 420 },
  scrollContent: { paddingBottom: 16 },
  label: { marginTop: 12, marginBottom: 4, fontWeight: "600" },
  sectionTitle: { marginTop: 16, marginBottom: 8, fontWeight: "700", fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  choiceRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  choiceLabel: { width: 20, fontWeight: "600" },
  choiceInput: { flex: 1, marginBottom: 0 },
  correctRow: { flexDirection: "row", gap: 8, marginBottom: 12 },
  correctBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  correctBtnSelected: { borderColor: "#2563eb", backgroundColor: "#eff6ff" },
  correctBtnText: { fontSize: 16, fontWeight: "600", color: "#64748b" },
  correctBtnTextSelected: { color: "#2563eb" },
  listHeader: { marginTop: 8 },
  listItem: { marginTop: 12, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#eee" },
  listItemText: { marginBottom: 4 },
  deleteText: { color: "red", fontWeight: "500" },
});
