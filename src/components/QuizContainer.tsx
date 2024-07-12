import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import ResultDisplay from "./ResultDisplay";

interface IUserAnswer {
  questionId: number;
  answerId: number;
}

interface IOption {
  id: number;
  text: string;
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
          { id: 1, text: "Unwavering moral compass and commitment to justice" },
          { id: 2, text: "Brilliant mind and technological prowess" },
          { id: 3, text: "Stealth, strategy, and detective skills" },
        ],
      },
      {
        id: 2,
        question: "If you had to choose a superpower, which would you prefer?",
        options: [
          { id: 1, text: "Superhuman strength, flight, and invulnerability" },
          {
            id: 2,
            text: "Genius-level intellect and wealth to fund advanced technology",
          },
          { id: 3, text: "Peak human physical and mental abilities" },
        ],
      },
      {
        id: 3,
        question: "How would you prefer to approach a dangerous situation?",
        options: [
          {
            id: 1,
            text: "Confront the threat head-on with your immense power",
          },
          {
            id: 2,
            text: "Analyze the situation and devise a strategic plan of attack",
          },
          {
            id: 3,
            text: "Use your high-tech gadgets and armored suit to overwhelm the enemy",
          },
        ],
      },
      {
        id: 4,
        question:
          "Which of these superhero alter egos would you most want to embody?",
        options: [
          { id: 1, text: "Mild-mannered reporter Clark Kent" },
          {
            id: 2,
            text: "Billionaire playboy Bruce Wayne",
          },
          { id: 3, text: "Eccentric inventor Tony Stark" },
        ],
      },
      {
        id: 5,
        question: "What is your preferred method of transportation?",
        options: [
          { id: 1, text: "Soaring through the sky under your own power" },
          {
            id: 2,
            text: "Gliding through the city in your high-tech Batmobile",
          },
          {
            id: 3,
            text: "Rocketing through the air in your advanced Iron Man suit",
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

  const handleAnswerSelect = (questionId: number, answerId: number) => {
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      { questionId: questionId, answerId: answerId },
    ]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizComplete(true);
    }
  };

  if (quizComplete) {
    return <ResultDisplay />;
  }

  return (
    <div>
      {questions.length > 0 && (
        <QuestionCard
          question={questions[currentQuestionIndex]}
          onSelectAnswer={handleAnswerSelect}
          onNextQuestion={handleNextQuestion}
          isLastQuestion={currentQuestionIndex === questions.length - 1}
        />
      )}
    </div>
  );
};

export default QuizContainer;
