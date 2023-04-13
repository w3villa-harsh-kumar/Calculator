function handleKeyPressAndCalculation(self){
    // Get the value of the input element
    let input = document.getElementById('calculator-screen');

    // Get the value of the button clicked
    let value = self.value;

    if(value === 'all-clear'){
        input.value = 0;
        return;
    }

    // If the value is a number, add it to the input
    if(!isNaN(value)){
        if(input.value==="Error"){
            input.value = value;
            return;
        }

        if(input.value === '0'){
            input.value = value;
        }else{
            input.value += value;
        }
    }

    // If the value is an operator, add it to the input
    if(value === '+' || value === '-' || value === '*' || value === '/' || value==='(' || value===')'){
        if(input.value==="Error"){
            input.value = value;
            return;
        }

        if(input.value === '0'){
            if(value==='(' || value===')'){
                input.value = value;
            }
            return;
        }

        // Handle Left Parenthesis
        if(value === '(' || value === ')'){
            let leftParenthesis = input.value.split('(').length - 1;
            let rightParenthesis = input.value.split(')').length - 1;

            if(leftParenthesis === 0){
                if(input.value.slice(-1) === '+' || input.value.slice(-1) === '-' || input.value.slice(-1) === '*' || input.value.slice(-1) === '/'){
                    input.value += value;
                }
                else{
                    return;
                }
            }

            if(leftParenthesis === rightParenthesis){
                return;
            }
            else{
                input.value += value;
            } 

            if(input.value.slice(-1) === '('){
                return;
            }

            if(input.value.slice(-1) === ')'){
                return;
            }
        }

        if(input.value.slice(-1) === '.'){
            return;
        }

        if(input.value.slice(-1) === '+' || input.value.slice(-1) === '-' || input.value.slice(-1) === '*' || input.value.slice(-1) === '/'){
            input.value = input.value.slice(0, -1) + value;
        }else{
            input.value += value;
        }
    }

    // If the value is a decimal, add it to the input
    if(value === '.'){
        if(input.value==="Error"){
            input.value = value;
            return;
        }

        // if the first operand is a decimal and we want to add a decimal to the second operand
        if(input.value.includes('+') || input.value.includes('-') || input.value.includes('*') || input.value.includes('/')){
            if(input.value.split(/[\+\-\*\/]/)[1]){
                input.value += value;
            }
        }

        if(input.value.slice(-1) === '.'){
            return;
        }

        if(input.value.includes('.') && input.value.slice(-1) !== '.'){
            return;
        }

        input.value += value;
    }

    // If the value is an equal sign, evaluate the input
    if(value === "="){
        if(input.value==="Error"){
            input.value = value;
            return;
        }

        try{
            input.value = eval(input.value);
        }
        catch(err){
            input.value = 'Error';
            return
        }
    }

    // If the value is a backspace, remove the last character
    if(value === 'backspace'){
        if(input.value==="Error"){
            input.value = value;
            return;
        }

        if(input.value.length === 1){
            input.value = 0;
            return;
        }
        input.value = input.value.slice(0, -1);
    }
}