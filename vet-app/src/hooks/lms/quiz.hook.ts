import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { IRootState } from "redux/store";
import {
  addQuizSuccess,
  editQuizSuccess,
  fetchQuizsAsync,
  setActiveQuiz,
} from "../../redux/lms/quiz.slice";
import { IQuiz, emptyQuiz } from "models/lms/quiz";
import { useFormErrors } from "hooks/shared/form-error.hook";
import { QuizService } from "services/lms/quiz.service";

const useQuiz = () => {
  const quizs = useSelector<IRootState, IQuiz[]>(
    (state) => state.quiz.quizs
  );
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.quiz.isLoading
  );
  const initialFetch = useSelector<IRootState, boolean>(
    (state) => state.quiz.initialFetch
  );
  const quiz = useSelector<IRootState, IQuiz>(
    (state) => state.quiz.quiz
  );

  const dispatch = useDispatch();
  const { setformError } = useFormErrors();

  const loadQuizs = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchQuizsAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addQuiz = async (quiz: IQuiz) => {
    return await QuizService.create(quiz)
      .then((quizResponse) => {
        dispatch(addQuizSuccess(quizResponse.data));
        return true;
      })
      .catch((error) => {
        setformError(error);
        return false;
      });
  };

  const setQuiz = (quiz: IQuiz) => {
    dispatch(setActiveQuiz(quiz));
  };

  const editQuiz = async (quiz: IQuiz) => {
    return await QuizService.update(quiz)
      .then((quizResponse) => {
        dispatch(editQuizSuccess(quizResponse.data));
        setQuiz(quizResponse.data);
        return true;
      })
      .catch((error) => {
        setformError(error);
        return false;
      });
  };

  const getQuiz = useCallback((quizId: string) => {
    const quiz = quizs.find((c) => c.id === quizId);

    if (!quiz) {
      return emptyQuiz;
    }
    return quiz;
  }, []);
  useEffect(() => {
    // loadQuizs();
  }, [quiz, quizs, isLoading, initialFetch, loadQuizs]);

  return {
    quiz,
    quizs,
    isLoading,
    initialFetch,
    addQuiz,
    editQuiz,
    setQuiz,
    getQuiz,
  };
};

export { useQuiz };
