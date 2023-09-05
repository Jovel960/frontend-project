const Input = ({type, onChange, placeHolder, inputValue,maxWidth }) => {
  return (
    <input
      type={type}
      style={{
        maxWidth: maxWidth ? "120px" : "",
        marginLeft:  maxWidth ? "15px" : "auto",
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
