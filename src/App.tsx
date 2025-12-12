import QuizLayout from "./components/QuizLayout";

/**
 * Questions array - keep the order as shown in the prototype.
 * Each item contains: text, options[], correctIndex (0-based).
 */
const QUESTIONS = [
  {
    text: "1. What sound does a cat make?",
    options: ["Bhau-Bhau", "Meow-Meow", "Oink-Oink", "Moo-Moo"],
    correctIndex: 1,
  },
  {
    text: "2. What would you probably find in your fridge?",
    options: ["Shoes", "Ice Cream", "Books", "Soap"],
    correctIndex: 1,
  },
  {
    text: "3. What color are bananas?",
    options: ["Blue", "Yellow", "Red", "Green"],
    correctIndex: 1,
  },
  {
    text: "4. How many stars are in the sky?",
    options: ["Two", "Infinite", "One Hundred", "None"],
    correctIndex: 1,
  },
];

export default function App() {
  return <QuizLayout questions={QUESTIONS} />;
}
