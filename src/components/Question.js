import Options from "./Options";

function Question({ currentQuestion, dispatch }) {
  return (
    <div>
      <h4>{currentQuestion.question}</h4>
      <Options
        currentQuestion={currentQuestion}
        dispatch={dispatch}
      />
    </div>
  );
}

export default Question;
