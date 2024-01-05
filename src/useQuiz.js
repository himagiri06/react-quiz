import { useEffect, useReducer } from "react";
const SECS_PER_QUESTION = {
  beginner: 10,
  intermediate: 20,
  advanced: 30,
};
const initialSate = {
  questions: [],
  levels: [],
  selectedQuestions: [],
  status: "loading", //loading, error, ready, activie, finished
  index: 0,
  // answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  difficulty: null, // all, beginner, intermediate, advanced
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        status: "ready",
        questions: action.payload.questions,
        highscore: action.payload.highscore,
        levels: [...new Set(action.payload.questions.map((question) => question.difficulty))],
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "levelSelected": {
      return {
        ...state,
        difficulty: action.payload,
        selectedQuestions: state.questions
          .filter((question) => question.difficulty === action.payload)
          .map((question) => {
            return { ...question, selectedOption: null };
          }),
      };
    }
    case "start":
      const secondsRemaining = state.selectedQuestions.reduce((acc, question) => (acc = acc + SECS_PER_QUESTION[question.difficulty]), 0);
      return {
        ...state,
        status: "active",
        secondsRemaining: secondsRemaining,
      };
    case "newAnswer":
      const question = state.selectedQuestions.at(state.index);
      const points = action.payload === question.correctOption ? state.points + question.points : state.points;
      return {
        ...state,
        selectedQuestions: state.selectedQuestions.map((question, index) =>
          index === state.index ? { ...question, selectedOption: action.payload } : question
        ),
        // answer: action.payload,
        points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        // answer: state.selectedQuestions.at(state.index + 1).selectedOption ?? null,
      };
    case "previousQuestion":
      return {
        ...state,
        index: state.index - 1,
        // answer: state.selectedQuestions.at(state.index - 1).selectedOption ?? null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore: state.highscore <= state.points ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialSate,
        questions: state.questions,
        levels: state.levels,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining <= 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown action");
  }
}

export default function useQuiz() {
  const [state, dispatch] = useReducer(reducer, initialSate);

  useEffect(function () {
    const controller = new AbortController();
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions", { signal: controller.signal });
        const questions = await res.json();
        const res1 = await fetch("http://localhost:8000/score", { signal: controller.signal });
        const score = await res1.json();
        dispatch({ type: "dataReceived", payload: { questions: questions, highscore: score.highscore } });
      } catch (e) {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchQuestions();
    return () => controller.abort();
  }, []);

  useEffect(
    function () {
      const controller = new AbortController();
      async function saveHighScore(score) {
        console.log(score);
        try {
          console.log("updating");
          console.log(score);
          const res = await fetch("http://localhost:8000/score", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ highscore: score }),
            signal: controller.signal,
          });
          const data = await res.json();
          console.log(data);
        } catch (e) {
          throw new Error("Error on saving highest score");
        }
      }
      if (state.status === "finished") saveHighScore(state.highscore);

      return () => controller.abort();
    },
    [state.status, state.highscore]
  );
  return [state, dispatch];
}
