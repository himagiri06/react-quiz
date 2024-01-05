import RadioButton from "./RadioButton";

function RadioButtonGroup({ groupName = "radio-group", options = [], className = "", onSelect }) {
  return (
    <div className={className}>
      {options.map((option) => (
        <RadioButton
          key={option.toString()}
          name={groupName}
          label={option}
          value={option}
          onSelect={(option) => onSelect(option)}
        />
      ))}
    </div>
  );
}

export default RadioButtonGroup;
