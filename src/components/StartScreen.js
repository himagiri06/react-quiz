import RadioButtonGroup from "../ui/RadioButtonGroup";

function StartScreen({ numQuestions, levels = [], dispatch, difficulty }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h3>Select the difficulty level</h3>
      <RadioButtonGroup
        groupName="difficulty"
        options={levels}
        className="difficulty"
        onSelect={(option) => dispatch({ type: "levelSelected", payload: option })}
      />
      {difficulty !== null && (
        <>
          <h3>
            {numQuestions} questions to test your React knowledge <span style={{ textTransform: "capitalize" }}>({difficulty})</span>
          </h3>
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "start" })}
          >
            Let's start
          </button>
        </>
      )}
    </div>
  );
}

export default StartScreen;
