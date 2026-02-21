import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { QuizContext } from "../../context/QuizContext";

export default function Preview() {
  const router = useRouter();
  const { quizQuestions, timer } = useContext(QuizContext);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [timeLeft, setTimeLeft] = useState(timer);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setTimeLeft(timer);
  }, [timer]);

  useEffect(() => {
    if (submitted) return;

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, submitted]);

  if (!quizQuestions || quizQuestions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.info}>
          No questions available. Add in Quiz Settings.
        </Text>
      </View>
    );
  }

  const question = quizQuestions[currentIndex];

  if (!question) {
    return (
      <View style={styles.container}>
        <Text style={styles.info}>Question not found.</Text>
      </View>
    );
  }

  const handleSelect = (choice: string) => {
    setAnswers({
      ...answers,
      [question.id]: choice,
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const calculateScore = () => {
    let score = 0;

    quizQuestions.forEach((q: any) => {
      if (answers[q.id] === q.answer) {
        score++;
      }
    });

    return score;
  };

  if (submitted) {
    return (
      <View style={styles.container}>
        <Text style={styles.result}>Quiz Finished!</Text>
        <Text style={styles.result}>
          Score: {calculateScore()} / {quizQuestions.length}
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace("/")}
          activeOpacity={0.8}
        >
          <Text style={styles.backButtonText}>Back to Start</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>Time Left: {timeLeft}s</Text>

      <Text style={styles.question}>
        {currentIndex + 1}. {question.question}
      </Text>

      {Object.entries(question?.choices || {}).map(([key, value]) => (
        <TouchableOpacity
          key={key}
          style={[
            styles.choice,
            answers[question.id] === key && styles.selected,
          ]}
          onPress={() => handleSelect(key)}
        >
          <Text>
            {key}. {value as string}
          </Text>
        </TouchableOpacity>
      ))}

      <View style={styles.buttons}>
        <TouchableOpacity
          disabled={currentIndex === 0}
          onPress={() =>
            setCurrentIndex((prev) =>
              prev > 0 ? prev - 1 : prev
            )
          }
        >
          <Text style={styles.nav}>Previous</Text>
        </TouchableOpacity>

        {currentIndex === quizQuestions.length - 1 ? (
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={styles.nav}>Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              setCurrentIndex((prev) =>
                prev < quizQuestions.length - 1
                  ? prev + 1
                  : prev
              )
            }
          >
            <Text style={styles.nav}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  timer: {
    fontSize: 18,
    color: "red",
    marginBottom: 10,
  },
  question: {
    fontSize: 18,
    marginBottom: 15,
  },
  choice: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  selected: {
    backgroundColor: "#d0e8ff",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  nav: {
    fontSize: 16,
    color: "blue",
  },
  result: {
    fontSize: 20,
    marginBottom: 10,
  },
  backButton: {
    marginTop: 24,
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    alignSelf: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  info: {
    fontSize: 16,
    textAlign: "center",
  },
});
