//Yovel Hadad 207125329, Rotem Zagori 316389378, Nissim Cohen 308152537
//Select component
const Select = ({ onChange, options }) => {
  return (
    <select
      style={{ display: "block" }}
      name="categories"
      id="categories"
      onChange={onChange}
    >
    {options?.map((option, i) => <option key={i} value={option}>{option[0].toUpperCase() + option.slice(1)}</option>)}
    </select>
  );
};

export default Select;
