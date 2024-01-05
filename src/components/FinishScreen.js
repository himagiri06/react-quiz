import Button from "./Button";

function FinishScreen({ points, totalPoints, highscore, dispatch }) {
  const percent = (points / totalPoints) * 100;
  let emoji;
  if (percent === 100) emoji = "🏅";
  if (percent >= 80 && percent < 100) emoji = "🥳";
  if (percent >= 50 && percent < 80) emoji = "🙃";
  if (percent >= 0 && percent < 50) emoji = "😕";
  if (percent === 0) emoji = "💩";
  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scored <strong>{points}</strong> out of {totalPoints} ({Math.ceil(percent)}%)
      </p>
      <p className="highscore">Highest score: {highscore} points</p>
      <Button onClick={() => dispatch({ type: "restart" })}>Restart</Button>
    </>
  );
}

export default FinishScreen;
