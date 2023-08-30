import { useState } from "react";
import Select from "./components/Select";
import Input from "./components/Input";
function App() {
  const [costItem, setCostItem] = useState("");
  const [sumOfItem, setSumOfItem] = useState("");
  const [categoryOfItem, setCategoryOfItems] = useState("");
  const [itemDescription, setItemDescription] = useState("");

  const onCostItemChange = ({ target }) => setCostItem(target.value);

  const onSumOfItemChange = ({ target }) => setSumOfItem(target.value);

  const onCategoryChange = ({ target }) => setCategoryOfItems(target.value);

  const onItemDescriptionChange = ({ target }) =>
    setItemDescription(target.value);

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
        <div id="main" class="card">
          <div class="card-content">
            <header className="">
              <h1>Costs Manager Client Application</h1>
            </header>
            <div className="input-field col s12">
              <Input placeHolder="New cost item" onChange={onCostItemChange} />
            </div>
            <div className="input-field col s12">
              <Input placeHolder="Sum" onChange={onSumOfItemChange} />{" "}
            </div>
            <div className="input-field col s12">
              <Input
                placeHolder="Description"
                onChange={onItemDescriptionChange}
              />
            </div>
            <Select onChange={onCategoryChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
