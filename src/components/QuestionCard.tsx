import { IQuestion } from "./QuizContainer";

interface QuestionCardProp {
  question: IQuestion;
  onSelectAnswer: any;
  onNextQuestion: any;
  isLastQuestion: boolean;
}

const QuestionCard: React.FC<QuestionCardProp> = () => {
  return <></>;
};

export default QuestionCard;
