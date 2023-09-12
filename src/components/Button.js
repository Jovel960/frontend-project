//Yovel Hadad 207125329, Rotem Zagori 316389378, Nissim Cohen 308152537
//Button component
const Button = ({ handleClick, placeHolder, className }) => {
  return (
    <button className={className} onClick={handleClick}>
      {placeHolder}
    </button>
  );
};

export default Button;
