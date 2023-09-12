import { useState, useEffect } from "react";
import Select from "./components/Select";
import Input from "./components/Input";
import Button from "./components/Button";
import Modal from "./components/Modal/Modal";
import Costs from "./components/Costs";
import idb from "./utilities/idb";
import getDate from "./utilities/helpers";
function App() {
  //Init states
  const [costItem, setCostItem] = useState("");
  const [sumOfItem, setSumOfItem] = useState("");
  const [categoryOfItem, setCategoryOfItems] = useState("Food");
  const [itemDescription, setItemDescription] = useState("");
  const [costs, setCosts] = useState([]);
  const [costDate, setCostDate] = useState("");
  const [reportCosts, setReportCosts] = useState([]);
  const [modal, setModal] = useState(false);

  //Fetching all the costs
  useEffect(() => {
    const getCosts = async () => {
      try {
        const costsData = await idb.getAllData(); // costDate is in "YYYY-MM" format
        console.log(costsData);
        setCosts(costsData);
      } catch (error) {
        alert("Error fetching initial data");
      }
    };
    setCostDate(getDate());
    getCosts();
  }, []);

  //Event handlers

  const onCostItemChange = ({ target }) => setCostItem(target.value);

  const onSumOfItemChange = ({ target }) => setSumOfItem(target.value);

  const onCategoryChange = ({ target }) => setCategoryOfItems(target.value);

  const onItemDescriptionChange = ({ target }) =>
    setItemDescription(target.value);

  const handleCostDate = (e) => setCostDate(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!costItem || !sumOfItem || !categoryOfItem || !itemDescription) {
      alert("Data is missing!");
      return;
    }
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
    idb
      .addCost(data)
      .then((id) => {
        setCostItem("");
        setSumOfItem("");
        setCategoryOfItems("");
        setItemDescription("");
      })
      .catch((error) => {
        alert("Error adding data");
      });
  };

  //Handle report
  const handleReport = async () => {
    try {
      const monthlyCosts = await idb.getCostsByMonthAndYear(costDate); // costDate is in "YYYY-MM" format
      setReportCosts(monthlyCosts);
    } catch (error) {
      alert("Error fetching initial data");
    } finally {
      setModal(true);
    }
  };

  return (
    <>
      <div className="container">
        <div id="main" className="card">
          <div className="card-content">
            <header style={{ display: "flex", flexDirection: "column" }}>
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
            {/* Cost Form */}
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
                className="waves-light btn"
                type="submit"
                onChange={() => false}
                placeHolder="Add item"
              />
            </form>
            <hr />
            <h4>Costs</h4>
            <Costs costs={costs} />
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
      {/* Report Modal */}
      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        costs={reportCosts}
        date={costDate}
      />
    </>
  );
}

export default App;
