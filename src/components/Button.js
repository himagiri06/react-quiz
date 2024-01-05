function Button({ children, disabled, onClick }) {
  return (
    <button
      className="btn btn-ui"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
