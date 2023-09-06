import { useState, useEffect } from "react";
import Select from "./components/Select";
import Input from "./components/Input";
import Button from "./components/Button";
import StorageActions from "./utilities/localStorage";
import Modal from "./components/Modal/Modal";
const storage = new StorageActions();
function App() {
  const [costItem, setCostItem] = useState("");
  const [sumOfItem, setSumOfItem] = useState("");
  const [categoryOfItem, setCategoryOfItems] = useState("Food");
  const [itemDescription, setItemDescription] = useState("");
  const [costs, setCosts] = useState([]);
  const [costDate, setCostDate] = useState("");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
    setCostDate(`${currentYear}-${currentMonth}`);
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const monthlyCosts = await storage.getCostsByMonthAndYear(costDate); // costDate is in "YYYY-MM" format
        setCosts(monthlyCosts);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    if (costDate) fetchInitialData();
  }, [costDate]);

  const onCostItemChange = ({ target }) => setCostItem(target.value);

  const onSumOfItemChange = ({ target }) => setSumOfItem(target.value);

  const onCategoryChange = ({ target }) => setCategoryOfItems(target.value);

  const onItemDescriptionChange = ({ target }) =>
    setItemDescription(target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCosts((prevCosts) => [
      ...prevCosts,
      { costItem, sumOfItem, categoryOfItem, itemDescription },
    ]);
    const data = {
      costItem,
      sumOfItem: parseFloat(sumOfItem),
      categoryOfItem,
      itemDescription,
      date: costDate,
    };
    storage
      .addData(data)
      .then((id) => {
        setCostItem("");
        setSumOfItem("");
        setCategoryOfItems("");
        setItemDescription("");
      })
      .catch((error) => {
        console.error("Error adding data:", error);
      });
  };

  const handleReport = () => {
    setModal(true);
  };

  const handleCostDate = (e) => {
    setCostDate(e.target.value);
  };

  // const resetItems = () => setCosts([]);

  return (
    <>
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
              <header style={{ display: "flex", flexDirection: "column" }}>
                <img
                  style={{
                    style: "flex",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  width="200"
                  height="200"
                  src="/images/image.jpg"
                />
                <h2
                  style={{
                    color: "darkblue",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  Costs Manager Client Application
                </h2>
              </header>
              <form onSubmit={handleSubmit}>
                <div className="input-field col s12">
                  <Input
                    inputValue={costItem}
                    type="text"
                    placeHolder="New cost item"
                    onChange={onCostItemChange}
                  />
                </div>
                <div className="input-field col s12">
                  <Input
                    inputValue={sumOfItem}
                    type="text"
                    placeHolder="Sum"
                    onChange={onSumOfItemChange}
                  />
                </div>
                <div className="input-field col s12">
                  <Input
                    inputValue={itemDescription}
                    text="text"
                    placeHolder="Description"
                    onChange={onItemDescriptionChange}
                  />
                </div>
                <Select
                  options={[
                    "food",
                    "health",
                    "housing",
                    "sport",
                    "education",
                    "transportation",
                  ]}
                  onChange={onCategoryChange}
                />
                <Input
                  type="submit"
                  onChange={() => false}
                  placeHolder="Add item"
                />
              </form>
              <hr />
              <h4>Costs</h4>
              <ul>
                {costs?.map((costItem, i) => (
                  <li key={i}>{costItem.costItem}</li>
                ))}
              </ul>
              {/* <Button
                handleClick={resetItems}
                placeHolder="Clear costs"
                className="waves-light clear-costs btn black"
              /> */}
              <span
                style={{
                  display: "flex",
                  marginTop: "10px",
                  alignItems: "center",
                }}
              >
                <Button
                  handleClick={handleReport}
                  placeHolder="Report"
                  className="waves-light btn"
                />
                <Input
                  maxWidth
                  inputValue={costDate}
                  type="month"
                  onChange={handleCostDate}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <Modal
          isOpen={modal}
          onClose={() => setModal(false)}
          costs={costs}
          date={costDate}
        />
      )}
    </>
  );
}

export default App;
