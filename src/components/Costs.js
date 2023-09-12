//Yovel Hadad 207125329, Rotem Zagori 316389378, Nissim Cohen 308152537
//Costs component
export default function Costs({ costs }) {
  return (
    <>
      {costs?.length > 0 ? (
        <ol className="modal-ul">
          {costs.map((cost, i) => (
            <li key={i}>
              {cost?.costItem[0]?.toUpperCase() +
                cost?.costItem.slice(1) +
                " ," +
                cost.sumOfItem +
                " ," +
                cost.categoryOfItem +
                " ," +
                cost.itemDescription}
            </li>
          ))}
        </ol>
      ) : (
        <span
          style={{
            fontSize: "16px",
            marginBottom: "5px",
            fontWeight: "600",
            color: "red",
          }}
        >
          No costs were found
        </span>
      )}
    </>
  );
}
