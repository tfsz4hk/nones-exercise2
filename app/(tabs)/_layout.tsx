import { Tabs } from "expo-router";
import { QuizProvider } from "../../context/QuizContext";

export default function TabLayout() {
  return (
    <QuizProvider>
      <Tabs>
        <Tabs.Screen
          name="preview"
          options={{ title: "Preview Quiz" }}
        />
        <Tabs.Screen
          name="settings"
          options={{ title: "Quiz Settings" }}
        />
      </Tabs>
    </QuizProvider>
  );
}
