import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import useQuiz from "../useQuiz";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Button from "./Button";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import Row from "../ui/Row";

export default function App() {
  const [{ status, index, points, highscore, secondsRemaining, levels, difficulty, selectedQuestions }, dispatch] = useQuiz();
  const currentQuestion = selectedQuestions.at(index);
  const numQuestions = selectedQuestions.length;
  const totalPoints = selectedQuestions.reduce((acc, question) => acc + question.points, 0);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            levels={levels}
            dispatch={dispatch}
            difficulty={difficulty}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              index={index}
              points={points}
              totalPoints={totalPoints}
              answer={currentQuestion.selectedOption}
            />
            <Question
              currentQuestion={currentQuestion}
              dispatch={dispatch}
            />
            <Footer>
              <Timer
                dispatch={dispatch}
                secondsRemaining={secondsRemaining}
              />
              <Row className="btn-row">
                {index > 0 && <Button onClick={() => dispatch({ type: "previousQuestion" })}>Previous</Button>}
                {index < numQuestions - 1 && (
                  <Button
                    disabled={currentQuestion.selectedOption === null}
                    onClick={() => dispatch({ type: "nextQuestion" })}
                  >
                    Next
                  </Button>
                )}
                {index === numQuestions - 1 && (
                  <Button
                    disabled={currentQuestion.selectedOption === null}
                    onClick={() => dispatch({ type: "finish" })}
                  >
                    Finish
                  </Button>
                )}
              </Row>
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
