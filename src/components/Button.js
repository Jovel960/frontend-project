const Button = ({ handleClick, placeHolder, className }) => {
  return (
    <button className={className} onClick={handleClick}>
      {placeHolder}
    </button>
  );
};

export default Button;
