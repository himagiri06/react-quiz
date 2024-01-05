import { useReducer } from "react";

const intialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + state.step };
    case "decrement":
      return { ...state, count: state.count - state.step };
    case "defineCount":
      return { ...state, count: action.payload };
    case "defineStep":
      return { ...state, step: action.payload };
    case "reset":
      return { ...intialState };
    default:
      throw new Error("Unknown action type");
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, intialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + count);

  const defineStep = function (e) {
    if (+e.target.value > 0) dispatch({ type: "defineStep", payload: +e.target.value });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={() => dispatch({ type: "decrement" })}>-</button>
        <input
          value={count}
          onChange={(e) => dispatch({ type: "defineCount", payload: +e.target.value })}
        />
        <button onClick={() => dispatch({ type: "increment" })}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
