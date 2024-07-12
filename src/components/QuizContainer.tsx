import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import ResultDisplay from "./ResultDisplay";
import { motion } from "framer-motion";

export interface IUserAnswer {
  questionId: number;
  name: string;
}

interface IOption {
  id: number;
  text: string;
  name: string;
}

export interface IQuestion {
  id: number;
  question: string;
  options: IOption[];
}

const QuizContainer = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<IUserAnswer[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const fetchQuestions = async () => {
    const mockQuestions: IQuestion[] = [
      {
        id: 1,
        question: "Which of these qualities is most important to you?",
        options: [
          {
            id: 1,
            text: "Unwavering moral compass and commitment to justice",
            name: "Superman",
          },
          {
            id: 2,
            text: "Brilliant mind and technological prowess",
            name: "Batman",
          },
          {
            id: 3,
            text: "Stealth, strategy, and detective skills",
            name: "Iron Man",
          },
        ],
      },
      {
        id: 2,
        question: "If you had to choose a superpower, which would you prefer?",
        options: [
          {
            id: 1,
            text: "Superhuman strength, flight, and invulnerability",
            name: "Superman",
          },
          {
            id: 2,
            text: "Genius-level intellect and wealth to fund advanced technology",
            name: "Batman",
          },
          {
            id: 3,
            text: "Peak human physical and mental abilities",
            name: "Iron Man",
          },
        ],
      },
      {
        id: 3,
        question: "How would you prefer to approach a dangerous situation?",
        options: [
          {
            id: 1,
            text: "Confront the threat head-on with your immense power",
            name: "Superman",
          },
          {
            id: 2,
            text: "Analyze the situation and devise a strategic plan of attack",
            name: "Batman",
          },
          {
            id: 3,
            text: "Use your high-tech gadgets and armored suit to overwhelm the enemy",
            name: "Iron Man",
          },
        ],
      },
      {
        id: 4,
        question:
          "Which of these superhero alter egos would you most want to embody?",
        options: [
          {
            id: 1,
            text: "Mild-mannered reporter Clark Kent",
            name: "Superman",
          },
          {
            id: 2,
            text: "Billionaire playboy Bruce Wayne",
            name: "Batman",
          },
          { id: 3, text: "Eccentric inventor Tony Stark", name: "Iron Man" },
        ],
      },
      {
        id: 5,
        question: "What is your preferred method of transportation?",
        options: [
          {
            id: 1,
            text: "Soaring through the sky under your own power",
            name: "Superman",
          },
          {
            id: 2,
            text: "Gliding through the city in your high-tech Batmobile",
            name: "Batman",
          },
          {
            id: 3,
            text: "Rocketing through the air in your advanced Iron Man suit",
            name: "Iron Man",
          },
        ],
      },
    ];

    await new Promise((resolve) => setTimeout(resolve, 500));

    const copy = [...mockQuestions];

    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    setQuestions(copy.slice(0, 3));
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAnswerSelect = (questionId: number, name: string) => {
    if (!userAnswers.find((userAnswer) => userAnswer.name === name))
      setUserAnswers((prevAnswers) => [...prevAnswers, { questionId, name }]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizComplete(true);
    }
  };

  if (quizComplete) {
    return <ResultDisplay userAnswers={userAnswers} />;
  }

  return (
    <div>
      {questions.length > 0 && (
        <motion.div
          key={currentQuestionIndex}
          animate={currentQuestionIndex !== 0 && { rotateY: 360 }}
          transition={{ duration: 1 }}
        >
          <QuestionCard
            question={questions[currentQuestionIndex]}
            onSelectAnswer={handleAnswerSelect}
            onNextQuestion={handleNextQuestion}
            isLastQuestion={currentQuestionIndex === questions.length - 1}
          />
        </motion.div>
      )}
    </div>
  );
};

export default QuizContainer;
