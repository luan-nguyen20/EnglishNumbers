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

var resultStr, onesPlace, tensPlace, teens, trillions, billions, thousands, hundreds, left, write;

function say(num){
    if(num === 0) {
        sayStr.textContent = "Zero.";
        return ['Zero.'];
    }

    resultStr = ''; //to be returned

    onesPlace = ['one','two','three','four','five','six','seven','eight','nine'];
    tensPlace = ['ten','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
    teens = ['eleven','twelve','thirteen','fourteen','fifteen','sixteen','seveteen','eighteen','nineteen'];
    
    left = num;
    write = left / 1000000000000;
    left = left - write*1000000000000;

    if(write>0){
        trillions = say(write);
        resultStr = resultStr + trillions + " trillion";

        if(left>0){
            resultStr = resultStr + " ";
        }
    }

    write = left / 1000000000;
    left = left - write*1000000000;

    if(write>0){
        billions = say(write);
        resultStr = resultStr + billions + " billion";

        if(left>0){
            resultStr = resultStr + " ";
        }
    }

    write = left / 1000000;
    left = left - write*1000000;

    if(write>0){
        millions = say(write);
        resultStr = resultStr + millions + " million";

        if(left>0){
            resultStr = resultStr + " ";
        }
    }

    write = left / 1000;
    left = left - write*1000;

    if(write>0){
        thousands = say(write);
        resultStr = resultStr + thousands + " thousand";

        if(left>0){
            resultStr = resultStr + " ";
        }
    }

    write = left / 100;
    left = left - write*100;

    if(write>0){
        hundreds = say(write);
        resultStr = resultStr + hundreds + " hundred";

        if(left>0){
            resultStr = resultStr + " and ";
        }
    }

    write = left/10;
    left = left - write*10;

    if(write>0){
        if(write===1 && left>0){
            resultStr = resultStr + teens[left-1];
            left = 0;
        }
        else{
            resultStr = resultStr + tensPlace[write-1];
        }

        if(left>0){
            resultStr = resultStr + "-";
        }
    }

    write = left;
    left = 0;
    
    if(write>0){
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


