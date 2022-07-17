import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import {
  BASE_API,
  QuestionResponseType,
  ServerError,
  UserDefinedQuestionsType,
} from "../../constants";

export const addQuestionService = createAsyncThunk(
  `questions/addQuestion`,
  async ({ question }: { question: UserDefinedQuestionsType }, thunkAPI) => {
    const normalizedQuestion = { ...question, tags: question.inputTag.tags };
    try {
      const response = await axios.post<QuestionResponseType>(
        `${BASE_API}/questions`,
        {
          question: normalizedQuestion,
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          return thunkAPI.rejectWithValue(serverError.response.data);
        } 
        return error;
      } else {
        console.error(`somehting went wrong..! `, error);
        return thunkAPI.rejectWithValue({
          success: false,
          message: `something went wrong`,
          errorMessage: error,
        });
      }
    }
  }
);
