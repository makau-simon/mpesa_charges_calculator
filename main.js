const inputAmount = document.querySelector("#amount");
const calculateButton = document.querySelector("#calculate_btn");
const table = document.getElementById("resultsTable");

// Normal mpesa transactions
const sendFee = document.querySelector("#sendFee");
const sendGets = document.querySelector("#sendGets");

//withdraw from agent transactions
const agentFee = document.querySelector("#agentFee");
const agentGets = document.querySelector("#agentGets");

//Adding click event listener
calculateButton.addEventListener("click", () => {
  calculate()
})
  //getting user input
  
  function calculate() {
    // Tab to edit
  if (!inputAmount.value.trim() == "") {
    //fetching the data from a json file
    fetch("mpesa_charges.json")
      .then((res) => res.json())
      .then((data) => {
        let amount = inputAmount.value;

        //highlighting the table after calculation
        table.classList.add("highlight");
        setTimeout(() => table.classList.remove("highlight"), 1000);

        //Displaying the sendfee data
        sendFee.textContent = getFee(amount, data.send_money);
        sendGets.textContent = amount;

        //displaying the withdraw data
        agentFee.textContent = getFee(amount, data.withdrawal_agent);
        agentGets.textContent = amount;
        showNotification();
      });
  } else {
    alert("Please enter amount!");
  }
}

//function to calculate the fee
function getFee(amount, table) {
  for (let item of table) {
    if (amount >= item.min && amount <= item.max) {
      return item.fee;
    }
  }
  return null;
}

function showNotification() {
  const notification = document.getElementById("notification");
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000); // disappears after 2 seconds
}


document.addEventListener("keydown",(e)=>{
if(e.key =="Enter"){
calculate()
}
})