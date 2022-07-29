//#region Declaration
const bill = document.querySelector(".bill");
const people = document.querySelector(".people");
const custom = document.querySelector(".custom");
const billErrorMesg = document.querySelector(".bill-title .error-mesg");
const peopleErrorMesg = document.querySelector(".people-title .error-mesg");
const tipOptionsBtns = Array.from(document.querySelectorAll(".tip-options button"));
const resetBtn = document.querySelector(".reset");
const tip = document.querySelector(".tip-amount > p");
const total = document.querySelector(".total-amount > p");

let selectedTipOption = 0;
//#endregion

//#region Functions
// function to show or hide error message when validationg fields
function showHideErrorMesgs(txt, lbl, action) {
    switch (action) {
        case "show":
            txt.classList.add("error");
            lbl.classList.add("show");
            break;
        case "hide":
            txt.classList.remove("error");
            lbl.classList.remove("show");
            break;
    }
}
// function to valiate fields
function validate(control, lbl) {
    if (control.value) {
        showHideErrorMesgs(control, lbl, "hide");
        return true;
    }
    else {
        showHideErrorMesgs(control, lbl, "show");
        return false;
    }
}
function resetActiceStyle(control) {
    control.forEach((item) => item.classList.remove("active"));
}
// function to add click event to tip options buttons
function tipButtonsClick() {
    tipOptionsBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            // reset active style from buttons
            resetActiceStyle(tipOptionsBtns);
            // btn.parentElement.querySelectorAll("button").forEach((item) => item.classList.remove("active"));
            // add active to current button
            btn.classList.toggle("active");
            // get the selected tip button value
            let selectedBtn = tipOptionsBtns.filter(btn => btn.classList.contains("active"))[0];
            selectedTipOption = selectedBtn.innerHTML.substring(0, selectedBtn.innerHTML.length - 1);
            // console.log(selectedTipOption);
            // clear custom value if exsist
            custom.value = "";
        });
    });
}
// funtion to add blur event to input fileds
function inputFieldsBlur() {
    bill.addEventListener("blur", (e) => {
        validate(bill, billErrorMesg);
    });
    people.addEventListener("blur", (e) => {
        validate(people, peopleErrorMesg);
    });
    custom.addEventListener("blur", () => {
        if (custom.value) {
            resetActiceStyle(tipOptionsBtns);
            selectedTipOption = custom.value;
        }
        else {
            selectedTipOption = 0;
        }
    });
}
// function to calc values
function calculate() {
    let billPerPerson = 0;
    let tipPerPerson = 0;
    let billValue = parseInt(bill.value);
    let noOfPersonsValue = parseInt(people.value);
    let tipValue = parseInt(selectedTipOption);
    
    // get bill per person
    billPerPerson = (billValue / noOfPersonsValue).toFixed(2);
    // get tip per person
    if (tipValue > 0) {
        tipPerPerson = (((bill.value * tipValue) / 100) / noOfPersonsValue).toFixed(2);
        tip.innerHTML = `$${tipPerPerson}`;
    } else {
        tip.innerHTML = "$0.00";
    }
    // get total bill
    total.innerHTML = `$${(parseFloat(billPerPerson) + parseFloat(tipPerPerson)).toFixed(2)}`;
    // make reset button active
    resetBtn.classList.add("active");
}
// function to show reset result
function resetResult() {
    resetBtn.addEventListener("click", () => {
        // first validate fileds
        if (validate(bill, billErrorMesg) && validate(people, peopleErrorMesg)) {
            calculate();
        } else {
            return false;
        }
    });
}
//#endregion

//#region  calls
inputFieldsBlur();
tipButtonsClick();
resetResult();
//#endregion




