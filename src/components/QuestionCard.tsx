import { useEffect, useState } from "react";
import { IQuestion } from "./QuizContainer";
import { motion, useAnimationControls } from "framer-motion";
import Fade from "./Fade";

interface QuestionCardProp {
  question: IQuestion;
  onSelectAnswer(questionId: number, name: string): void;
  onNextQuestion(): void;
  isLastQuestion: boolean;
}

const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const QuestionCard: React.FC<QuestionCardProp> = ({
  question,
  onNextQuestion,
  onSelectAnswer,
  isLastQuestion,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const animateControl = useAnimationControls();

  useEffect(() => {
    animateControl.set({
      opacity: 0,
      y: -80,
    });
    animateControl.start({
      opacity: 1,
      y: 0,
      transition: { duration: 1 },
    });
  }, []);

  const handleSelectAnswer = (answerId: number, name: string) => () => {
    setSelectedAnswer(answerId);
    onSelectAnswer(question.id, name);
  };

  const handleNext = async () => {
    if (selectedAnswer) {
      animateControl.start({
        opacity: 0,
        x: -80,
        transition: { duration: 1 },
      });

      await delay(1000);
      animateControl.set({
        opacity: 0,
        y: -80,
        x: 0,
      });
      animateControl.start({
        opacity: 1,
        y: 0,
        x: 0,
        transition: { duration: 1 },
      });
      onNextQuestion();
      setSelectedAnswer(null);
    }
  };

  return (
    <Fade animateControl={animateControl}>
      <div className="mt-[60px] flex flex-col items-center space-y-6">
        <div className="bg-indigo-500 rounded-2xl p-6 w-full max-w-2xl shadow-md">
          <div className="mb-8 text-white text-2xl font-bold mb-4">
            {question.question}
          </div>
          <div className="space-y-4">
            {question.options.map(({ id, text, name }) => (
              <div
                key={id}
                className={`bg-indigo-500 rounded-full px-6 py-3 text-white text-lg flex items-center justify-between`}
                style={{
                  backgroundColor:
                    selectedAnswer === id ? "#38a169" : "#6b46c1",
                  transition: "background-color 0.3s ease",
                }}
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
    </Fade>
  );
};

export default QuestionCard;
