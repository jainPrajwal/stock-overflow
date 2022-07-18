import { Question } from "../../constants";

export const getQuestionFromQuestionId = (
  questions: Array<Question>,
  questionId: string
) => questions.find((question) => question._id === questionId);
