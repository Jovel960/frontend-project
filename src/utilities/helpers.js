//Get date helper function
function getDate() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
  return `${currentYear}-${currentMonth}`;
}

export default getDate;
