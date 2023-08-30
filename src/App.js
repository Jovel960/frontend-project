import { useState } from "react";
import Select from "./components/Select";
import Input from "./components/Input";
import Button from "./components/Button";
// import { StorageActions } from "./utilities/localStorage";
function App() {
  const [costItem, setCostItem] = useState("");
  const [sumOfItem, setSumOfItem] = useState("");
  const [categoryOfItem, setCategoryOfItems] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [costs, setCosts] = useState([])
  const [costDate, setCostDate] = useState("");

  const onCostItemChange = ({ target }) => setCostItem(target.value);

  const onSumOfItemChange = ({ target }) => setSumOfItem(target.value);

  const onCategoryChange = ({ target }) => setCategoryOfItems(target.value);

  const onItemDescriptionChange = ({ target }) =>
    setItemDescription(target.value);

    const handleSubmit = (e) => {
      e.preventDefault();
      setCosts((prevCosts) => [...prevCosts, {costItem, sumOfItem, categoryOfItem, itemDescription}]);
      setCostItem("");
      setSumOfItem("");
      setCategoryOfItems("");
      setItemDescription("");
    }

    const handleReport = () => false;

    const handleCostDate = (e) => setCostDate(e.target.value)

    const resetItems = () => setCosts([]);

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          border: "2px",
          borderColor: "black",
        }}
      >
        <div id="main" className="card">
          <div className="card-content">
            <header className="">
              <h2>Costs Manager Client Application</h2>
            </header>
            <form onSubmit={handleSubmit}>
              <div className="input-field col s12">
                <Input inputValue={costItem} type="text"
                  placeHolder="New cost item"
                  onChange={onCostItemChange}
                />
              </div>
              <div className="input-field col s12">
                <Input inputValue={sumOfItem} type="text" placeHolder="Sum" onChange={onSumOfItemChange} />{" "}
              </div>
              <div className="input-field col s12">
                <Input inputValue={itemDescription} text="text"
                  placeHolder="Description"
                  onChange={onItemDescriptionChange}
                />
              </div>
              <Select onChange={onCategoryChange} />
              <Input type="submit" onChange={() => false} placeHolder="Add item" />
            </form>
            <hr />
            <h4>Costs</h4>
            <ul>
            {costs?.map((costItem, i) => <li key={i}>{costItem.costItem}</li>)}
            </ul>
            <Button handleClick={resetItems} placeHolder="Clear costs" className="waves-light clear-costs btn black"/>
            <span style={{display:"flex", marginTop:"10px"}}>
            <Button handleClick={handleReport} placeHolder="Report" className="waves-light btn" />
            <Input type="month" onChange={handleCostDate} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
