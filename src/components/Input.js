const Input = ({type, onChange, placeHolder, inputValue }) => {
  return (
    <input
      type={type}
      style={{
        marginLeft: "auto",
        marginRight: "auto",
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
