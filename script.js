    let endResult = document.getElementById('result');
    let last = document.getElementById('last');
    endResult.style.display = 'none';
    let lastText = document.getElementById('text');
    
    let totalArray = [];
    let newArray = [];
    let finalArray;
    const income = document.getElementById('income');    
    const budget = document.getElementById('budget');
    const fullSpan = document.getElementById('full');
    const totalExpenseSpan = document.getElementById('expenseResult');
    const incomeSpan = document.getElementById('incomeResult');
    const betaIncome = document.getElementById('income');
    const discIncome = document.getElementById('discIncome');
    let totalExpenses;
    
    //This function removes extra spaces but you must add this function to input elements
    function removeSpaces(string) {
        return string.split(' ').join('');
       }

    function calculate() {
        const totalIncome = Number(betaIncome.value.replace(/,/g, '')); //We replace the commas with an empty string so that JS can do math with the value.
        for(let i=0; i < totalArray.length; i++) {
            newArray.push(totalArray[i].value.replace(/,/g, '')); //variable 'i' holds the input element, so we add '.value' to the end of it to get what the user typed into the input box. Then we add that value to the newArray, giving us a list of numbers.
        }
        finalArray = newArray.map((el) => Number(el)); //finalArray turns the string values into numbers by using .map.
        newArray = []; //This cleans out the array so that the numbers don't double, see what happens if you get rid of this!
        finalArray = finalArray.reduce((a, b) => a + b, 0);
        totalExpenses = finalArray;
        if (totalExpenses.toLocaleString(undefined, {'minimumFractionDigits':2,'maximumFractionDigits':2}) == 'NaN' || totalIncome.toFixed(2) == 'NaN') {
            endResult.style.display = 'block';
            totalExpenseSpan.style.display = 'none';
            last.style.display = 'none';
            incomeSpan.innerHTML = "Error: Please type numbers only!";
            incomeSpan.style.color = "red";
        } else {
            endResult.style.display = 'block';
            totalExpenseSpan.style.display = 'block';
            last.style.display = 'block';
            incomeSpan.innerHTML = "Total Income:&nbsp $ " + totalIncome.toLocaleString(undefined, {'minimumFractionDigits':2,'maximumFractionDigits':2}); //the .toLocaleString is how we add commas and decimals to our number at the end.
            totalExpenseSpan.innerHTML = "Total Expenses:&nbsp $ " + totalExpenses.toLocaleString(undefined, {'minimumFractionDigits':2,'maximumFractionDigits':2});
            incomeSpan.style.color = "white";
            
            let result = (totalIncome - totalExpenses);
            
            if (result > 0) {
                discIncome.innerHTML = "Discretionary Income:&nbsp " + "$&nbsp<span id='neg'>" + result.toLocaleString(undefined, {'minimumFractionDigits':2,'maximumFractionDigits':2}) + "</span>"; //The span will be to turn the color red.
                document.getElementById('neg').style.color = "#07ff00";
                lastText.innerHTML = "You have &nbsp" + "$&nbsp<span style='color: #07ff00;'>" + result.toLocaleString(undefined, {'minimumFractionDigits':2,'maximumFractionDigits':2}) + "</span>" + " left after calculating your expenses."
            } else if (result == 0) {
                discIncome.innerHTML = "Discretionary Income:&nbsp " + "$&nbsp<span id='neg'>" + result.toLocaleString(undefined, {'minimumFractionDigits':2,'maximumFractionDigits':2}) + "</span>"; //The span will be to turn the color red.
                document.getElementById('neg').style.color = "#eb8f34";
                lastText.innerHTML = "You have &nbsp" + "$&nbsp<span style='color: #eb8f34;'>" + result.toLocaleString(undefined, {'minimumFractionDigits':2,'maximumFractionDigits':2}) + "</span>" + " left after calculating your expenses."
            } else {
                result = Math.abs(result); //turning the negative number into a positive so I can put the result into accounting format.
                discIncome.innerHTML = "Discretionary Income:&nbsp " + "$&nbsp<span id='neg'>(" + result.toLocaleString(undefined, {'minimumFractionDigits':2,'maximumFractionDigits':2}) + ")</span>"; //The span will be to turn the color red.
                document.getElementById('neg').style.color = "#ff4242";
                lastText.innerHTML = "You are over your budget by &nbsp" + "$&nbsp<span style='color: #ff4242;'>" + result.toLocaleString(undefined, {'minimumFractionDigits':2,'maximumFractionDigits':2}) + "</span>" + ". Consider reducing or removing some of your expenses."
            }
        }
        
    }


    function expense() {
        var question = prompt("What is the name of your new expense?", "Groceries");
        if (question == null) {
            return; //If the user hits cancel, then do nothing!
        } else {
        const newExpense = document.createElement('input');
        const label = document.createElement('label');
        newExpense.setAttribute('type', 'text');
        newExpense.setAttribute('class', 'newElement');
        newExpense.setAttribute('onblur', "this.value=removeSpaces(this.value);")
        label.innerHTML = question + "&nbsp";
        const br = document.createElement('br');
        document.getElementById('first').appendChild(label);
        document.getElementById('first').appendChild(newExpense);
        document.getElementById('first').appendChild(br);
        totalArray.push(newExpense)
    }
}

    