import { useState } from "react";
import { IQuestion } from "./QuizContainer";
import { motion } from "framer-motion";

interface QuestionCardProp {
  question: IQuestion;
  onSelectAnswer(questionId: number, name: string): void;
  onNextQuestion(): void;
  isLastQuestion: boolean;
}

const QuestionCard: React.FC<QuestionCardProp> = ({
  question,
  onNextQuestion,
  onSelectAnswer,
  isLastQuestion,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleSelectAnswer = (answerId: number, name: string) => () => {
    setSelectedAnswer(answerId);
    onSelectAnswer(question.id, name);
  };

  const handleNext = () => {
    if (selectedAnswer) onNextQuestion();
  };

  return (
    <>
      <div className="mt-[60px] flex flex-col items-center space-y-6">
        <div className="bg-indigo-500 rounded-2xl p-6 w-full max-w-2xl shadow-md">
          <div className="mb-8 text-white text-2xl font-bold mb-4">
            {question.question}
          </div>
          <div className="space-y-4">
            {question.options.map(({ id, text, name }) => (
              <div
                key={id}
                className="bg-indigo-500 rounded-full px-6 py-3 text-white text-lg flex items-center justify-between"
              >
                <label htmlFor={`${id}`}>{text}</label>
                <input
                  id={`${id}`}
                  type="radio"
                  checked={selectedAnswer === id}
                  onChange={handleSelectAnswer(id, name)}
                />
              </div>
            ))}
          </div>
          <motion.div
            className="bg-orange-400 mt-10 rounded-full px-2 py-3 text-white text-1xl flex justify-center cursor-pointer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={handleNext}
          >
            {isLastQuestion ? "Finish" : "Next Question"}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
