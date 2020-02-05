const input = document.querySelector(".input");

//func to validate input for inputDisplay according to the inputFilter.
function setInputFilter(input, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
      input.addEventListener(event, function() {
        if (inputFilter(this.value)) { //if inputFilter test succeeds
            //set input value to new value
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
        } 
        else if (this.hasOwnProperty("oldValue")) {
            //if test fails and input already has a value,
            //set value to its old value (no changes)
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } 
        else { //if test fails and input doesn't have a value,
            this.value = ""; //set value to empty
        }
      });
    });
}

//integers >= 0
const positiveIntNumOnlyRegEx = /^\d*$/;

//func to check if a value has only int numbers
function positiveIntNumOnlyTest(valueToTest){
    return positiveIntNumOnlyRegEx.test(valueToTest);
}

//set the filter for inputDisplay to allow float numbers only
setInputFilter(input, positiveIntNumOnlyTest);

const sayStr = document.querySelector("#sayStr");

let resultStr, left, write;

function say(num){
    resultStr = '';
    if (num === 0){resultStr = "Zero.";}

    onesPlace = ['one','two','three','four','five','six','seven','eight','nine'];
    tensPlace = ['ten','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
    teens = ['eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];

    left = num; //what we still have left to write out
    write = left / 1000000000000; //how many trillions left to write out
    left = left - write*1000000000000; //subtract those trillions

    if (write > 0){
        trillions = say(write);
        resultStr = resultStr + trillions + " trillion";
    
        if (left > 0){
            resultStr = resultStr + " "; //so we don't write 'two trilliontwo billion'
        }
    }

    write = left / 1000000000; //how many billions left to write out
    left = left - write*1000000000; //subtract those billions

    if (write > 0){
        billions = say(write);
        resultStr = resultStr + billions + " billion";
    
        if (left > 0){
            resultStr = resultStr + " "; //so we don't write 'two billiontwo million'
        }
    }
    
    write = left / 1000000; //how many millions left to write out
    left = left - write*1000000; //subtract those millions

    if (write > 0){
        millions = say(write);
        resultStr = resultStr + millions + " million";

        if (left > 0){
            resultStr = resultStr + " "; //so we don't write 'two milliontwo thousand'
        }
    }
    
    write = left / 1000; //how many thousands left to write out
    left = left - write*1000; //subtract those thousands

    if (write > 0){
        thousands = say(write);
        resultStr = resultStr + thousands + " thousand";

        if (left > 0){
            resultStr = resultStr + " "; //so we don't write 'two thousandtwo hundred'
        }
    }

    write = left/100; //how many hundreds left to write out
    left = left - write*100; //subtract those hundreds

    if (write > 0){
        hundreds = say(write);
        resultStr = resultStr + hundreds + " hundred";
        
        if (left > 0){
            resultStr = resultStr + " and "; //so we don't write 'two hundredfifty-one'
        }
    }

    write = left/10; //how many tens left to write out
    left  = left - write*10;  // Subtract off those tens.

    if (write > 0){
        if ((write == 1) && (left > 0)){
            //special exceptions for teens
            resultStr = resultStr + teens[left-1];
            left = 0;
        }
        else{
            resultStr = resultStr + tensPlace[write-1];
        }

        if (left > 0){
            resultStr = resultStr + "-"; //so we don't write 'sixtyfour'
        }
    }

    write = left; //hows many ones left to write out
    left = 0; //subtract those ones

    if (write > 0){
        resultStr = resultStr + onesPlace[write-1];
    }

    sayStr.textContent = resultStr;
    return resultStr;
}

//event listener for submitBtn
const submitBtn = document.querySelector("#submitBtn")
submitBtn.addEventListener('click',function() {
    say(Number(input.value));
});

