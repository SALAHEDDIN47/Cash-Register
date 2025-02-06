let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

let sum = 0;
let changeSpans = document.querySelectorAll(".change");
const total = document.getElementById("total");
const result = document.getElementById("text");
const purchaseBtn = document.getElementById("Purchase");

total.textContent = `$${price.toFixed(2)}`;

// Render the change drawer
changeSpans.forEach((span, index) => {
    if (cid[index]) {
        span.textContent = `${cid[index][0]}: $${cid[index][1].toFixed(2)}`;
    }
});

// Calculate total cash in drawer
cid.forEach(element => {
    sum += element[1];
});

purchaseBtn.addEventListener("click", () => {
    const inputValue = Number(document.getElementById("cash").value);

    if (inputValue < price) {
        alert("Cash isn't enough!");
    } 
    else if (inputValue === price) {
        result.innerHTML = `<div class="paragraph"><p>No change due - customer paid with exact cash</p></div>`;
    } 
    else if (inputValue > sum + price) {
        result.innerHTML = `<div class="paragraph"><p>INSUFFICIENT FUNDS</p></div>`;
    } 
    else if ((inputValue - price) <= sum) {
        let changeDue = inputValue - price;
        let changeArray = [];

        for (let i = cid.length - 1; i >= 0; i--) {
            let coinName = cid[i][0];
            let coinValue = cid[i][1];
            let coinAmount = 0;
            let coinWorth = 0;

            switch (coinName) {
                case "PENNY": coinWorth = 0.01; break;
                case "NICKEL": coinWorth = 0.05; break;
                case "DIME": coinWorth = 0.10; break;
                case "QUARTER": coinWorth = 0.25; break;
                case "ONE": coinWorth = 1.00; break;
                case "FIVE": coinWorth = 5.00; break;
                case "TEN": coinWorth = 10.00; break;
                case "TWENTY": coinWorth = 20.00; break;
                case "ONE HUNDRED": coinWorth = 100.00; break;
            }

            while (changeDue >= coinWorth && coinValue > 0) {
                changeDue -= coinWorth;
                changeDue = Math.round(changeDue * 100) / 100;
                coinValue -= coinWorth;
                coinAmount += coinWorth;
            }

            if (coinAmount > 0) {
                changeArray.push(`${coinName}: $${coinAmount.toFixed(2)}`);
                cid[i][1] = coinValue;  // Update cash in drawer
            }
        }

        if (changeDue > 0) {
            result.innerHTML = `<div class="paragraph"><p>INSUFFICIENT FUNDS</p></div>`;
        } else {
            result.innerHTML = `<div class="paragraph"><p>Change Due:</p> <p>${changeArray.join("<br>")}</p></div>`;
        }

        // Update displayed cash in drawer
        changeSpans.forEach((span, index) => {
            if (cid[index]) {
                span.textContent = `${cid[index][0]}: $${cid[index][1].toFixed(2)}`;
            }
        });
    }
});
