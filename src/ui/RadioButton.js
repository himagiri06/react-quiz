const defaultStyle = {
  display: "flex",
  gap: "2rem",
  fontFamily: "inherit",
  color: "inherit",
  fontSize: "2rem",
  border: "2px solid var(--color-dark)",
  backgroundColor: "var(--color-dark)",
  padding: "1.2rem 2.4rem",
  cursor: "pointer",
  borderRadius: "100px",
  transition: "0.3s",
  textTransform: "capitalize",
};

function RadioButton({ value = "", label = "", name = "", onSelect, styles = {} }) {
  const computedStyles = { ...defaultStyle, ...styles };

  return (
    <label style={computedStyles}>
      <input
        name={name}
        type="radio"
        value={value}
        onChange={(e) => onSelect?.(e.target.value)}
      />
      {label}
    </label>
  );
}

export default RadioButton;
