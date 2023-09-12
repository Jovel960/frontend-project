//Yovel Hadad 207125329, Rotem Zagori 316389378, Nissim Cohen 308152537
//Get date helper function
function getDate() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
  return `${currentYear}-${currentMonth}`;
}

export default getDate;
