const Input = ({ onChange, placeHolder }) => {
  return (
    <input
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10px",
        marginBottom: "10px",
      }}
      onChange={onChange}
      placeholder={placeHolder}
    />
  );
};

export default Input;
