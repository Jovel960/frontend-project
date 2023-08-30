const Select = ({ onChange }) => {
  return (
    <select
      style={{ display: "block" }}
      name="categories"
      id="categories"
      onChange={onChange}
    >
      <option value="food">Food</option>
      <option value="health">Health</option>
      <option value="housing">Housing</option>
      <option value="sport">Sport</option>
      <option value="education">Education</option>
      <option value="transportation">Transportation</option>
    </select>
  );
};

export default Select;
