import { Question } from "../../constants";

export const getSearchedQuestions = ({
  questions,
  searchedQuery,
}: {
  questions: Array<Question>;
  searchedQuery: string;
}) => {
  return questions.filter((question) =>
    question.title.toLowerCase().includes(searchedQuery.toLowerCase())
  );
};
