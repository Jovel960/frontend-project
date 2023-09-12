//Yovel Hadad 207125329, Rotem Zagori 316389378, Nissim Cohen 308152537
//Input component
const Input = ({
  type,
  onChange,
  placeHolder,
  inputValue,
  maxWidth,
  className,
}) => {
  return (
    <input
      className={className}
      type={type}
      style={{
        maxWidth: maxWidth ? "140px" : "",
        marginLeft: maxWidth ? "15px" : "auto",
        marginRight: maxWidth ? "" : "auto",
        marginTop: "10px",
        marginBottom: "10px",
      }}
      value={inputValue}
      onChange={onChange}
      placeholder={placeHolder}
    />
  );
};

export default Input;
