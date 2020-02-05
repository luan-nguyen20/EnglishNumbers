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

function say(num){
    if(num === 0) {
        sayStr.textContent = "Zero.";
        return ['Zero.'];
    }

    let resultStr = ''; //to be returned

    let onesPlace = ['one','two','three','four','five','six','seven','eight','nine'];
    let tensPlace = ['ten','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
    let teens = ['eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
    
    let left = num;

    let write = Math.floor(left / 1000000000000);
    left = left - write*1000000000000;
    console.log("tril" + write);
    console.log("tril" + left);

    if(write>0){
        let trillions = say(write);
        resultStr = resultStr + trillions + " trillion";

        if(left>0){
            resultStr = resultStr + " and ";
        }
    }

    write = Math.floor(left / 1000000000);
    left = left - write*1000000000;
    console.log("bil" + write);
    console.log("bil" + left);

    if(write>0){
        let billions = say(write);
        resultStr = resultStr + billions + " billion";

        if(left>0){
            resultStr = resultStr + " and ";
        }
    }

    write = Math.floor(left / 1000000);
    left = left - write*1000000;
    console.log("mil" + write);
    console.log("mil" + left);

    if(write>0){
        let millions = say(write);
        resultStr = resultStr + millions + " million";

        if(left>0){
            resultStr = resultStr + " and ";
        }
    }

    write = Math.floor(left / 1000);
    left = left - write*1000;
    console.log("thousands" + write);
    console.log("thousands" + left);

    if(write>0){
        let thousands = say(write);
        resultStr = resultStr + thousands + " thousand";

        if(left>0){
            resultStr = resultStr + " and ";
        }
    }

    write = Math.floor(left / 100);
    left = left - write*100;
    console.log("hundreds" + write);
    console.log("hundreds" + left);

    if(write>0){
        let hundreds = say(write);
        resultStr = resultStr + hundreds + " hundred";

        if(left>0){
            resultStr = resultStr + " and ";
        }
    }

    write = Math.floor(left/10);
    left = left - write*10;
    console.log("tens" + write);
    console.log("tens" + left);

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

    write = Math.floor(left);
    console.log("ones" + write);
    console.log("ones" + left);
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

//Enter key will click the submitBtn
window.addEventListener('keydown',function(e){
    if(e.key === "Enter"){ submitBtn.click();}
});

const speechNotSupportedTxt = document.querySelector('#speechNotSupportedTxt');

function checkSynth(){
    if('speechSynthesis' in window){
        let synth = speechSynthesis;
        var flag = false;

        submitBtn.addEventListener('click',play);

        function play(){
            if(!flag){ 
                flag = true; //so if the button is clicked later, the code inside the first if won’t execute
                let utterance = new SpeechSynthesisUtterance(sayStr.textContent);
                utterance.voice = synth.getVoices()[3];
                utterance.onend = function(){ flag = false;}
                synth.speak(utterance);
            } 
        }
    }
    else{
        speechNotSupportedTxt.textContent = 'Speech not supported. Please try a different browser.';
    }
}

//window.onload = checkSynth;


