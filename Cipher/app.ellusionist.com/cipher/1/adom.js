// JavaScript Document

//var sprintf = require("sprintf-js").sprintf
var pressTimer;
var longpress = 1000;
var percTimeout;
var eqTimeout;
var acTimeout;
var equalsButtonPressCount = 0;
var piResponse;

function getThousandsSeparator() {
    "use strict";
    var number = 3500;
    var thouSep = ",";
    try {
        var sep = number.toLocaleString().substring(1, 2);
        if (sep === ' ') {
            sep = ',';
        }
        if (sep === '.' || sep === ',' || sep === String.fromCharCode(160) || sep === "'") {
            thouSep = sep;
        }
    } catch (e) {}
    return thouSep;
}

function getDecimalSeparator() {
    "use strict";
    //fallback  
    var decSep = ".";

    try {
        // this works in FF, Chrome, IE, Safari and Opera
        var sep = parseFloat(3 / 2).toLocaleString().substring(1, 2);
        if (sep === '.' || sep === ',') {
            decSep = sep;
        }
    } catch (e) {}

    return decSep;
}

function btnMouseDown() {
    "use strict";
    if (Licenced === false) {
        showOptions();
    }
    //console.log(event.target.id + " mouse down")
    if (event.target.id === "btnperc") {
        percTimeout = setTimeout(showOptions, longpress);
    } else if (event.target.id === "btnEquals") {
        eqTimeout = setTimeout(eqLongPress, longpress);
    } else if (event.target.id === "btnac") {
        acTimeout = setTimeout(acLongPress, longpress);
    }
}
var elem;
var pos;
var optionsanimationtimer;
var cancelTouchUp = false;

function acLongPress() {
    "use strict";
    vibrate(200);
    operations = [];
    localStorage.setItem("operations", JSON.stringify(operations));
    reloadRevealViewData();
    cancelTouchUp = true;
    equalsButtonPressCount = 0;
}

function eqLongPress() {
    "use strict";
    cancelTouchUp = true;
    if (cancelAfterEquals === false && IgnoreRevealBeforeClear === true) {
        return;
    }
    var buttons = ["btnac", "btninv", "btnperc", "btndivide", "btn7", "btn8", "btn9", "btnMultiply", "btn4", "btn5", "btn6", "btnMinus", "btn1", "btn2", "btn3", "btnAdd", "btn0", "btnDecimal", "btnEquals"];
    for (var i = 0; i < buttons.length; i++) {
        try {
            if (i >= operations.length) {
                document.getElementById(buttons[i]).innerHTML = "";
                if (buttons[i] === "btnac" || buttons[i] === "btninv" || buttons[i] === "btnperc") {
                    resize("#" + buttons[i], 36);
                } else {
                    resize("#" + buttons[i], 38);
                }
            } else {
                if (BirthdayInput) {
                    if (i + 1 === BirthdayMonthPosition) {
                        if (operations[i] > 12 || (DisplayMonthName === null || DisplayMonthName === false)) {
                            document.getElementById(buttons[i]).innerHTML = operations[i];
                        } else {
                            // display month name
                            document.getElementById(buttons[i]).innerHTML = getMonth(operations[i]);
                        }
                    } else {
                        document.getElementById(buttons[i]).innerHTML = operations[i];
                    }
                } else {
                    document.getElementById(buttons[i]).innerHTML = operations[i];
                }
                //resize("#"+buttons[i], 38);
                if (buttons[i] === "btnac" || buttons[i] === "btninv" || buttons[i] === "btnperc") {
                    resize("#" + buttons[i], 36);
                } else {
                    resize("#" + buttons[i], 38);
                }
            }
        } catch (ex) {
            document.getElementById(buttons[i]).innerHTML = "Error";
        }
    }
    if (DisplayStarSign === true) {
        var starsign;
        if (operations.length >= BirthdayMonthPosition && operations.length >= BirthdayDayPosition) {
            var BirthdayDay = operations[BirthdayDayPosition - 1];
            var BirthdayMonth = operations[BirthdayMonthPosition - 1];
            //var starsign;
            if (Use13StarSigns === true) {
                starsign = getNewZodiac(BirthdayDay, BirthdayMonth);
            } else {
                starsign = getZodiacV2(BirthdayDay, BirthdayMonth, 2);
            }
            if (document.getElementById("btn0").innerHTML.length > 0) {
                document.getElementById("btn0").innerHTML = document.getElementById("btn0").innerHTML.concat(", ").concat(starsign);
            } else {
                document.getElementById("btn0").innerHTML = starsign;
            }
            resize("#btn0", 38);
        }
    }
    if (operations.length >= BirthdayMonthPosition && operations.length >= BirthdayDayPosition && operations.length >= BirthdayYearPosition) {
        var age = getAge(operations[BirthdayDayPosition - 1], operations[BirthdayMonthPosition - 1], operations[BirthdayYearPosition - 1]);
        if (document.getElementById("btnDecimal").innerHTML.length > 0) {
            document.getElementById("btnDecimal").innerHTML = document.getElementById("btnDecimal").innerHTML.concat(", ").concat(age);
        } else {
            document.getElementById("btnDecimal").innerHTML = age;
        }
        resize("#btnDecimal", 38);
    }
    showPiCalcInfoInRevealScreen();
}

function getAge(day, month, year) {
    "use strict";
    try {
        day = parseInt(day);
        month = parseInt(month);

        console.log('before replacing space in year', year, 'length', year.length);
        year = year.replace(/\s/g, '');
        console.log('after replacing space in year', year, 'length', year.length);
        year = parseInt(year);
    } catch (ex) {
        return "";
    }
    var today = new Date();
    if (YearMode !== true) {
        var birthDate = new Date(year, month - 1, day, 12, 0, 0);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        console.log('Year mode false', birthDate.toLocaleString(getLocale(), {
            weekday: 'short'
        }) + ", " + age);
        return birthDate.toLocaleString(getLocale(), {
            weekday: 'short'
        }) + ", " + age;
    } else {
        const dayOfWeekObj = getDayOfWeek(day, month, year);
        return dayOfWeekObj;
    }
}

function showOptions() {
    "use strict";
    //console.log("Show Options");
    //$("#btnperc").webuiPopover({title:'Title',content:'',width:viewportwidth-4,height:viewportheight-57,arrow:false,cache:false,closeable:true,trigger:'manual'}); 
    $("#btnperc").webuiPopover({
        title: 'Options',
        type: "iframe",
        url: './Options.html',
        width: viewportwidth - 14,
        height: viewportheight - 25,
        arrow: false,
        cache: false,
        closeable: true,
        trigger: 'manual'
    });


    $("#btnperc").webuiPopover('show');
    document.addEventListener('escapeHandler', initialise, false);
    elem = document.getElementById("webuiPopover0");
    //elem.style.top = viewportheight - 20;
    elem.style.top = "50px";
    //document.getElementById('webuiPopover0').style.top = 0;
    elem.style.left = 0;

    //pos = viewportheight;
    //optionsanimationtimer = setInterval(frame, 5);
    cancelTouchUp = true;
}
/*function frame() {"use strict";
	if (pos === 20) {
   		clearInterval(optionsanimationtimer);
    } else {
		pos = pos - 15; 
      	if(pos < 20)
		{
			pos = 20;
		}
		elem.style.top = pos + 'px';
    }
}*/
function btnMouseUp() {
    "use strict";
    //console.log(event.target.id + " mouse up")
    //		document.getElementById("calcField").innerHTML = event.target.id + " mouse up";
    if (event.target.id === "btnperc") {
        clearTimeout(percTimeout);
    }
    if (event.target.id === "btnEquals") {
        clearTimeout(eqTimeout);
        if (HoldEqualsToReveal) {
            resetButtonLabels();
        }
    }
    if (event.target.id === "btnac") {
        clearTimeout(acTimeout);
    }
    if (cancelTouchUp === true) {
        cancelTouchUp = false;
        return;
    }
    switch (event.target.id) {
        case "btn0":
            digit("0");
            break;
        case "btn1":
            digit("1");
            break;
        case "btn2":
            digit("2");
            break;
        case "btn3":
            digit("3");
            break;
        case "btn4":
            digit("4");
            break;
        case "btn5":
            digit("5");
            break;
        case "btn6":
            digit("6");
            break;
        case "btn7":
            digit("7");
            break;
        case "btn8":
            digit("8");
            break;
        case "btn9":
            digit("9");
            break;

        case "btnDecimal":
            {
                if (decimalFlag === true) {
                    appendFieldValue(getDecimalSeparator());
                    removeZero = true;
                }
                decimalFlag = false;
                break;
            }

        case "btnAdd":
            {
                var skipAddingToOperations = false;
                if (IgnoreCalcResultsInReveal && equalsLastPressed) {
                    skipAddingToOperations = true;
                }
                equalsLastPressed = false;
                if (digitPressedSinceOperationButton === true)
                //[operations addObject:[self.field.text copy]];
                {
                    if (!skipAddingToOperations) {
                        operations.push(getFieldValue());
                    }
                }
                localStorage.setItem("operations", JSON.stringify(operations));
                digitPressedSinceOperationButton = false;
                //[self caluclate];
                calculate();
                choice = 1;

                calcOperation = true;
                decimalFlag = true;
                firstThingDone = true;
                //[self setBorderWidth];
                setBorderWidth();
                getPiCalc();
                break;
            }
        case "btnMinus":
            {
                var skipAddingToOperations = false;
                if (IgnoreCalcResultsInReveal && equalsLastPressed) {
                    skipAddingToOperations = true;
                }
                equalsLastPressed = false;
                if (digitPressedSinceOperationButton === true)
                //[operations addObject:[self.field.text copy]];
                {
                    if (!skipAddingToOperations) {
                        operations.push(getFieldValue());
                    }
                }
                localStorage.setItem("operations", JSON.stringify(operations));
                digitPressedSinceOperationButton = false;
                //[self caluclate];
                calculate();
                choice = 2;

                calcOperation = true;
                decimalFlag = true;
                firstThingDone = true;
                //[self setBorderWidth];
                setBorderWidth();
                getPiCalc();
                break;
            }
        case "btnMultiply":
            {
                var skipAddingToOperations = false;
                if (IgnoreCalcResultsInReveal && equalsLastPressed) {
                    skipAddingToOperations = true;
                }
                equalsLastPressed = false;
                if (digitPressedSinceOperationButton === true)
                //[operations addObject:[self.field.text copy]];
                {
                    if (!skipAddingToOperations) {
                        operations.push(getFieldValue());
                    }
                }
                localStorage.setItem("operations", JSON.stringify(operations));
                digitPressedSinceOperationButton = false;
                //[self caluclate];
                calculate();
                choice = 3;

                calcOperation = true;
                decimalFlag = true;
                firstThingDone = true;
                //[self setBorderWidth];
                setBorderWidth();
                getPiCalc();
                break;
            }
        case "btndivide":
            {
                var skipAddingToOperations = false;
                if (IgnoreCalcResultsInReveal && equalsLastPressed) {
                    skipAddingToOperations = true;
                }
                equalsLastPressed = false;
                if (digitPressedSinceOperationButton === true)
                //[operations addObject:[self.field.text copy]];
                {
                    if (!skipAddingToOperations) {
                        operations.push(getFieldValue());
                    }
                }
                localStorage.setItem("operations", JSON.stringify(operations));
                digitPressedSinceOperationButton = false;
                //[self caluclate];
                calculate();
                choice = 4;

                calcOperation = true;
                decimalFlag = true;
                firstThingDone = true;
                //[self setBorderWidth];
                setBorderWidth();
                getPiCalc();
                break;
            }
        case "btnEquals":
            {
                if (firstThingDone) {
                    //[operations addObject:[self.field.text copy]];
                    operations.push(getFieldValue());
                    localStorage.setItem("operations", JSON.stringify(operations));
                }
                equalsButtonPressCount++;
                //[_revealCollectionView reloadData];
                reloadRevealViewData();
                //[self caluclate];
                calculate();
                //self.field.text=[NSString stringWithFormat:@"%lg", currentValue];
                if (UseToxicForce === true) {
                    if (equalsButtonPressCount === ToxicRevealEqualsPressNumber) {
                        setFieldValue(sprintf("%f", ToxicForceNumber));
                    } else {
                        if (currentValue > 999999999) {
                            setFieldValue(sprintf("%.6e", currentValue));
                        } else {
                            setFieldValue(sprintf("%.6f", currentValue));
                        }
                    }
                } else {
                    if (currentValue > 999999999) {
                        setFieldValue(sprintf("%.6e", currentValue));
                    } else {
                        setFieldValue(sprintf("%.6f", currentValue));
                    }
                }
                choice = 0;
                equalsLastPressed = true;
                getPiCalc();
                break;
            }
        case "btnac":
            {
                //[self resetButtonLabels];
                resetButtonLabels();
                removeZero = false;

                //self.field.text=@"0";
                setFieldValue("0");
                if (cleared || equalsLastPressed) {
                    currentValue = 0;
                    choice = 0;
                    decimalFlag = true;
                    firstThingDone = false;
                    calcOperation = false;
                    cancelAfterEquals = true;
                    //[self resetBorderWidth];
                    resetBorderWidth();
                } else {
                    //[_buttonClear setTitle:@"AC" forState:UIControlStateNormal];
                    setCancelButtonTitle("AC");
                    //[self setBorderWidth];
                    setBorderWidth();
                }
                cleared = true;
                //[_revealCollectionView reloadData];
                reloadRevealViewData();
                equalsLastPressed = false;

                break;
            }
    }
}


function reloadRevealViewData() {
    "use strict";
    var tbl = document.getElementById('revealTable');
    if (document.contains(document.getElementById("revealBody"))) {
        document.getElementById("revealBody").remove();
    }
    if (cancelAfterEquals === false && IgnoreRevealBeforeClear === true) {
        var tbdy = document.createElement('tbody');
        tbdy.id = "revealBody";
        tbdy.style.backgroundColor = "#000000";
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.className = "revealcell";
        tr.appendChild(td);
        tbdy.appendChild(tr);
        tbl.appendChild(tbdy);
        return;
    }
    if (operations.length === 0) {
        var tbdy1 = document.createElement('tbody');
        tbdy1.id = "revealBody";
        tbdy1.style.backgroundColor = "#000000";
        var tr1 = document.createElement('tr');
        var td1 = document.createElement('td');
        td1.className = "revealcell";
        tr1.appendChild(td1);
        tbdy1.appendChild(tr1);
        tbl.appendChild(tbdy1);
        return;
    }
    var tbdy2 = document.createElement('tbody');
    tbdy2.id = "revealBody";
    tbdy2.style.backgroundColor = "#000000";

    var rowCount = Math.ceil(operations.length / 5);
    var currentCell = 0;
    for (var i = 0; i < rowCount; i++) {
        var tr2 = document.createElement('tr');
        for (var j = 0; j < 6; j++) {
            if (currentCell === operations.length) {
                if (operations.length >= BirthdayMonthPosition && operations.length >= BirthdayDayPosition && operations.length >= BirthdayYearPosition) {
                    var age = getAge(operations[BirthdayDayPosition - 1], operations[BirthdayMonthPosition - 1], operations[BirthdayYearPosition - 1]);
                    var td3 = document.createElement('td');
                    td3.className = "revealcell";
                    if (YearMode !== true) {
                        td3.appendChild(document.createTextNode(age));
                    } else {
                        td3.appendChild(document.createTextNode(age));
                    }

                    tr2.appendChild(td3);
                }
                if (DisplayStarSign) {
                    var starsign;
                    if (operations.length >= BirthdayMonthPosition && operations.length >= BirthdayDayPosition) {
                        var BirthdayDay = operations[BirthdayDayPosition - 1];
                        var BirthdayMonth = operations[BirthdayMonthPosition - 1];
                        //var starsign;
                        if (Use13StarSigns === true) {
                            starsign = getNewZodiac(BirthdayDay, BirthdayMonth);
                        } else {
                            starsign = getZodiacV2(BirthdayDay, BirthdayMonth, 2);
                        }
                        var td2 = document.createElement('td');
                        td2.className = "revealcell";
                        td2.appendChild(document.createTextNode(starsign));
                        tr2.appendChild(td2);
                    }
                }
                break;
            } else {
                var td3 = document.createElement('td');
                td3.className = "revealcell";
                td3.appendChild(document.createTextNode(operations[currentCell]));
                tr2.appendChild(td3);
            }
            currentCell++;
        }
        tbdy2.appendChild(tr2);
    }
    tbl.appendChild(tbdy2);
    resize(".revealcell", 50);
}
//Calculator variables

var decimalFlag = true;
var removeZero = false;
var calcOperation = false;
var cleared = true;
var firstThingDone = false;
var equalsLastPressed = false;
var digitPressedSinceOperationButton = false;
var cancelAfterEquals; //boolean
var choice = 0;
var currentValue = 0.0;

var flipSign = false;

function calculate() {
    "use strict";
    let fieldValStr = getFieldValue();
    console.log('before replace', fieldValStr, 'length', fieldValStr.length);
    fieldValStr = fieldValStr.replace(/\s/g, '');
    console.log('after replace', fieldValStr, 'length', fieldValStr.length);
    let fieldValNum = parseFloat(fieldValStr);
    console.log('Field Value Number', fieldValNum);

    if (firstThingDone) {
        if (flipSign) {
            //NSString * newString = [self.field.text substringWithRange:NSMakeRange(0, 1)];
            var newString = getFieldValue().charAt(0);
            //if([newString isEqualToString:@"-"] && currentValue > 0)
            if (newString === "-" && currentValue > 0) {
                currentValue = -currentValue;
            } else if (newString === "-" && currentValue < 0) //else if(![newString isEqualToString:@"-"] && currentValue < 0)
            {
                currentValue = -currentValue;
            }
            flipSign = false;
        }

        switch (choice) {
            case 1:
                // currentValue += parseFloat(filed); //[self.field.text doubleValue];
                currentValue += fieldValNum;
                break;
            case 2:
                // currentValue -= parseFloat(getFieldValue()); //[self.field.text doubleValue];
                currentValue -= fieldValNum;
                break;
            case 3:
                // currentValue *= parseFloat(getFieldValue()); //[self.field.text doubleValue];
                currentValue *= fieldValNum;
                break;
            case 4:
                // currentValue /= parseFloat(getFieldValue()); //[self.field.text doubleValue];
                currentValue /= fieldValNum;
                break;
        }
        //self.field.text=[NSString stringWithFormat:@"%lg", currentValue];
        //setFieldValue(sprintf("%.6g", currentValue));
        if (UseToxicForce === true) {
            if (equalsButtonPressCount === ToxicRevealEqualsPressNumber) {
                setFieldValue(sprintf("%f", ToxicForceNumber));
            } else {
                if (currentValue > 999999999) {
                    setFieldValue(sprintf("%.6e", currentValue));
                } else {
                    setFieldValue(sprintf("%.6f", currentValue));
                }
            }
        } else {
            if (currentValue > 999999999) {
                setFieldValue(sprintf("%.6e", currentValue));
            } else {
                setFieldValue(sprintf("%.6f", currentValue));
            }
        }
        calcOperation = false;
    } else {
        //currentValue = [self.field.text doubleValue];
        // currentValue = parseFloat(getFieldValue());
        currentValue = fieldValNum;
    }

}

function digit(d) {
    "use strict";
    cancelAfterEquals = false;
    equalsLastPressed = false;
    digitPressedSinceOperationButton = true;
    if (calcOperation === true) {
        //self.field.text=@"";
        setFieldValue("");
        firstThingDone = true;
    }

    if (removeZero === true) {
        appendFieldValue(d);
    } else {
        setFieldValue(d);
    }
    removeZero = true;
    calcOperation = false;
    setCancelButtonTitle("C");
    cleared = false;
    resetBorderWidth();
}

function getFieldValue() {
    "use strict";
    var thouSep = getThousandsSeparator();
    if (thouSep === '.') {
        return document.getElementById("innerCalcField").innerHTML.replace(/\./g, "").replace(/,/g, ".");
    } else if (thouSep === String.fromCharCode(160)) {
        return document.getElementById("innerCalcField").innerHTML.replace(new RegExp(/(&nbsp;)/ig), "").replace(/,/g, ".");
    } else if (thouSep === "'") {
        return document.getElementById("innerCalcField").innerHTML.replace(/'/g, "");
    } else {
        return document.getElementById("innerCalcField").innerHTML.replace(/,/g, "");
    }
}

function setFieldValue(value) {
    "use strict";
    //If empty, then empty
    if (value === "") {
        document.getElementById("innerCalcField").innerHTML = "";
    } else {
        //Check for scientific notation. If so, remove the + symbol and display as is.
        if (value.indexOf('e') > -1) {
            value = value.replace('+', '');
            document.getElementById("innerCalcField").innerHTML = value;
        } else {
            console.log('value', value);
            //If not scientific, parse the supplied value to the current locale.
            document.getElementById("innerCalcField").innerHTML = parseFloat(value).toLocaleString();
            localStorage.setItem("fieldvalue", JSON.stringify(document.getElementById("innerCalcField").innerHTML));
        }
    }
    localStorage.setItem("fieldvalue", JSON.stringify(document.getElementById("innerCalcField").innerHTML));
    resize("#innerCalcField", 100);
}

function appendFieldValue(value) {
    "use strict";
    //If overall length is 9 characters, don't bother trying to append anything
    if (document.getElementById("innerCalcField").innerHTML.replace(new RegExp(/(&nbsp;)/ig), "").replace(/,/g, "").replace(/\./g, "").length === 9) {
        return;
    }
    //If trying to append the decimal separator, it's a simple one
    if (value === getDecimalSeparator()) {
        document.getElementById("innerCalcField").innerHTML = document.getElementById("innerCalcField").innerHTML.concat(value);
    } else {
        var thouSep = getThousandsSeparator();
        //Remove the thousands separator, concat the value on to the end of the string, parse the float value, find the amount of significant digits 
        //and display it using the current locale with the correct number of significant digits as computed
        if (thouSep === '.') {
            var n = decimalPlaces(parseFloat(document.getElementById("innerCalcField").innerHTML.replace(/\./g, "").replace(/,/g, ".").concat(value))); //Last replace is to substitute incorrect decimal separator because javascript is a dick.
            var value2 = parseFloat(document.getElementById("innerCalcField").innerHTML.replace(/\./g, "").replace(/,/g, ".").concat(value)).toLocaleString(getLocale(), {
                minimumFractionDigits: n
            });
            document.getElementById("innerCalcField").innerHTML = value2;
        } else if (thouSep === String.fromCharCode(160)) {
            var n = decimalPlaces(parseFloat(document.getElementById("innerCalcField").innerHTML.replace(new RegExp(/(&nbsp;)/ig), "").replace(/,/g, ".").concat(value))); //Last replace is to substitute incorrect decimal separator because javascript is a dick.
            var value2 = parseFloat(document.getElementById("innerCalcField").innerHTML.replace(new RegExp(/(&nbsp;)/ig), "").replace(/,/g, ".").concat(value)).toLocaleString(getLocale(), {
                minimumFractionDigits: n
            });
            document.getElementById("innerCalcField").innerHTML = value2;
        } else if (thouSep === "'") {
            var n = decimalPlaces(parseFloat(document.getElementById("innerCalcField").innerHTML.replace(/'/g, "").concat(value)));
            var value2 = parseFloat(document.getElementById("innerCalcField").innerHTML.replace(/'/g, "").concat(value)).toLocaleString(getLocale(), {
                minimumFractionDigits: n
            });
            document.getElementById("innerCalcField").innerHTML = value2;
        } else {
            if (getLocale() == 'fr-fr') {
                var n = decimalPlaces(parseFloat(document.getElementById("innerCalcField").innerHTML.replace(/'/g, "").concat(value)));
                var value2 = document.getElementById("innerCalcField").innerHTML.replace(/'/g, "").concat(value).toLocaleString(getLocale(), {
                    minimumFractionDigits: n
                });
                document.getElementById("innerCalcField").innerHTML = value2;
            } else {
                var n = decimalPlaces(parseFloat(document.getElementById("innerCalcField").innerHTML.replace(/,/g, "").concat(value)));
                var value2 = parseFloat(document.getElementById("innerCalcField").innerHTML.replace(/,/g, "").concat(value)).toLocaleString(getLocale(), {
                    minimumFractionDigits: n
                });
                document.getElementById("innerCalcField").innerHTML = value2;
            }

        }
    }
    //Now set the localStorage value to the fieldvalue
    localStorage.setItem("fieldvalue", JSON.stringify(document.getElementById("innerCalcField").innerHTML));
    resize("#innerCalcField", 100);

}

function decimalPlaces(num) {
    "use strict";
    var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) {
        return 0;
    }
    return Math.max(0,
        // Number of digits right of decimal point.
        (match[1] ? match[1].length : 0) /* Adjust for scientific notation.*/ - (match[2] ? +match[2] : 0));
}

function setCancelButtonTitle(value) {
    "use strict";
    document.getElementById("btnac").innerHTML = value;
}

function resetBorderWidth() {
    "use strict";
    var ios_11 = JSON.parse(localStorage.getItem("iOS11Style"));
    if (ios_11) {
        $("#btnAdd").removeClass("operationios11on");
        $("#btnMinus").removeClass("operationios11on");
        $("#btnMultiply").removeClass("operationios11on");
        $("#btndivide").removeClass("operationios11on");
    } else {
        var cellheight = getButtonHeight(); //(viewportwidth/4) - 4;

        document.getElementById("btnAdd").style.height = cellheight + "px";
        document.getElementById("btnMinus").style.height = cellheight + "px";
        document.getElementById("btnMultiply").style.height = cellheight + "px";
        document.getElementById("btndivide").style.height = cellheight + "px";
        document.getElementById("btnAdd").style.width = cellheight + "px";
        document.getElementById("btnMinus").style.width = cellheight + "px";
        document.getElementById("btnMultiply").style.width = cellheight + "px";
        document.getElementById("btndivide").style.width = cellheight + "px";

        document.getElementById("btnAdd").style.borderWidth = "0px";
        document.getElementById("btnMinus").style.borderWidth = "0px";
        document.getElementById("btnMultiply").style.borderWidth = "0px";
        document.getElementById("btndivide").style.borderWidth = "0px";
    }

}

function setBorderWidth() {
    "use strict";
    resetBorderWidth();
    var ios_11 = JSON.parse(localStorage.getItem("iOS11Style"));
    if (ios_11) {
        switch (choice) {
            case 1:
                $("#btnAdd").addClass("operationios11on");
                break;
            case 2:
                $("#btnMinus").addClass("operationios11on");
                break;
            case 3:
                $("#btnMultiply").addClass("operationios11on");
                break;
            case 4:
                $("#btndivide").addClass("operationios11on");
                break;
        }

    } else {
        var cellheight = getButtonHeight(); //(viewportwidth/4) - 6;
        switch (choice) {
            case 1:
                document.getElementById("btnAdd").style.borderWidth = "2px";
                document.getElementById("btnAdd").style.height = cellheight - 4 + "px";
                document.getElementById("btnAdd").style.width = cellheight - 4 + "px";
                break;
            case 2:
                document.getElementById("btnMinus").style.borderWidth = "2px";
                document.getElementById("btnMinus").style.height = cellheight - 4 + "px";
                document.getElementById("btnMinus").style.width = cellheight - 4 + "px";
                break;
            case 3:
                document.getElementById("btnMultiply").style.borderWidth = "2px";
                document.getElementById("btnMultiply").style.height = cellheight - 4 + "px";
                document.getElementById("btnMultiply").style.width = cellheight - 4 + "px";
                break;
            case 4:
                document.getElementById("btndivide").style.borderWidth = "2px";
                document.getElementById("btndivide").style.height = cellheight - 4 + "px";
                document.getElementById("btndivide").style.width = cellheight - 2 + "px";
                break;
        }
    }
}

function resetButtonLabels() {
    "use strict";
    document.getElementById("btn0").innerHTML = "0";
    document.getElementById("btn1").innerHTML = "1";
    document.getElementById("btn2").innerHTML = "2";
    document.getElementById("btn3").innerHTML = "3";
    document.getElementById("btn4").innerHTML = "4";
    document.getElementById("btn5").innerHTML = "5";
    document.getElementById("btn6").innerHTML = "6";
    document.getElementById("btn7").innerHTML = "7";
    document.getElementById("btn8").innerHTML = "8";
    document.getElementById("btn9").innerHTML = "9";
    document.getElementById("btnAdd").innerHTML = "＋";
    document.getElementById("btnMinus").innerHTML = "−";
    document.getElementById("btnMultiply").innerHTML = "×";
    document.getElementById("btndivide").innerHTML = "÷";
    document.getElementById("btnac").innerHTML = "AC";
    document.getElementById("btnDecimal").innerHTML = getDecimalSeparator();
    document.getElementById("btnperc").innerHTML = "%";
    document.getElementById("btninv").innerHTML = "+/-";
    document.getElementById("btnEquals").innerHTML = "=";
    var ios_11 = JSON.parse(localStorage.getItem("iOS11Style"));
    if (ios_11) {
        resize(".numberButtonios11", 38);
        resize(".operationios11", 48);
        resize(".topButtonios11", 38);
    } else {
        resize(".numberButton", 38);
        resize(".operationButton", 38);
        resize(".topButton", 38);
    }
}

function getZodiacV2(day, month, variance) {
    "use strict";
    var sign = translateStarSign("Unknown");
    switch (parseInt(month)) {
        case 1:
            if (parseInt(day) < (21 - variance)) {
                sign = translateStarSign("Capricorn");
            } else if (parseInt(day) > 21 + variance) {
                sign = translateStarSign("Aquarius");
            } else {
                sign = translateStarSign("Capricorn") + "/" + translateStarSign("Aquarius");
            }
            break;
        case 2:
            if (parseInt(day) < (20 - variance)) {
                sign = translateStarSign("Aquarius");
            } else if (parseInt(day) > 20 + variance) {
                sign = translateStarSign("Pisces");
            } else {
                sign = translateStarSign("Aquarius") + "/" + translateStarSign("Pisces");
            }
            break;
        case 3:
            if (parseInt(day) < (21 - variance)) {
                sign = translateStarSign("Pisces");
            } else if (parseInt(day) > 21 + variance) {
                sign = translateStarSign("Aries");
            } else {
                sign = translateStarSign("Pisces") + "/" + translateStarSign("Aries");
            }
            break;
        case 4:
            if (parseInt(day) < (21 - variance)) {
                sign = translateStarSign("Aries");
            } else if (parseInt(day) > 21 + variance) {
                sign = translateStarSign("Taurus");
            } else {
                sign = translateStarSign("Aries") + "/" + translateStarSign("Taurus");
            }
            break;
        case 5:
            if (parseInt(day) < (22 - variance)) {
                sign = translateStarSign("Taurus");
            } else if (parseInt(day) > 22 + variance) {
                sign = translateStarSign("Gemini");
            } else {
                sign = translateStarSign("Taurus") + "/" + translateStarSign("Gemini");
            }
            break;
        case 6:
            if (parseInt(day) < (22 - variance)) {
                sign = translateStarSign("Gemini");
            } else if (parseInt(day) > 22 + variance) {
                sign = translateStarSign("Cancer");
            } else {
                sign = translateStarSign("Gemini") + "/" + translateStarSign("Cancer");
            }
            break;
        case 7:
            if (parseInt(day) < (23 - variance)) {
                sign = translateStarSign("Cancer");
            } else if (parseInt(day) > 23 + variance) {
                sign = translateStarSign("Leo");
            } else {
                sign = translateStarSign("Cancer") + "/" + translateStarSign("Leo");
            }
            break;
        case 8:
            if (parseInt(day) < (23 - variance)) {
                sign = translateStarSign("Leo");
            } else if (parseInt(day) > 23 + variance) {
                sign = translateStarSign("Virgo");
            } else {
                sign = translateStarSign("Leo") + "/" + translateStarSign("Virgo");
            }
            break;
        case 9:
            if (parseInt(day) < (24 - variance)) {
                sign = translateStarSign("Virgo");
            } else if (parseInt(day) > 24 + variance) {
                sign = translateStarSign("Libra");
            } else {
                sign = translateStarSign("Virgo") + "/" + translateStarSign("Libra");
            }
            break;
        case 10:
            if (parseInt(day) < (24 - variance)) {
                sign = translateStarSign("Libra");
            } else if (parseInt(day) > 24 + variance) {
                sign = translateStarSign("Scorpio");
            } else {
                sign = translateStarSign("Libra") + "/" + translateStarSign("Scorpio");
            }
            break;
        case 11:
            if (parseInt(day) < (23 - variance)) {
                sign = translateStarSign("Scorpio");
            } else if (parseInt(day) > 23 + variance) {
                sign = translateStarSign("Sagittarius");
            } else {
                sign = translateStarSign("Scorpio") + "/" + translateStarSign("Sagittarius");
            }
            break;
        case 12:
            if (parseInt(day) < (22 - variance)) {
                sign = translateStarSign("Sagittarius");
            } else if (parseInt(day) > 22 + variance) {
                sign = translateStarSign("Capricorn");
            } else {
                sign = translateStarSign("Sagittarius") + "/" + translateStarSign("Capricorn");
            }
            break;
    }
    return sign;
}
//Zodiac Signs
function getZodiac(day, month) {
    "use strict";
    var sign = "Unknown";
    if (parseInt(month) === 1) {
        if (parseInt(day) >= 21) {
            sign = "Aquarius";
        } else {
            sign = "Capricorn";
        }
    } else if (parseInt(month) === 2) {
        if (parseInt(day) >= 20) {
            sign = "Pisces";
        } else {
            sign = "Aquarius";
        }
    } else if (parseInt(month) === 3) {
        if (parseInt(day) >= 21) {
            sign = "Aries";
        } else {
            sign = "Pisces";
        }
    } else if (parseInt(month) === 4) {
        if (parseInt(day) >= 21) {
            sign = "Taurus";
        } else {
            sign = "Aries";
        }
    } else if (parseInt(month) === 5) {
        if (parseInt(day) >= 22) {
            sign = "Gemini";
        } else {
            sign = "Taurus";
        }
    } else if (parseInt(month) === 6) {
        if (parseInt(day) >= 22) {
            sign = "Cancer";
        } else {
            sign = "Gemini";
        }
    } else if (parseInt(month) === 7) {
        if (parseInt(day) >= 23) {
            sign = "Leo";
        } else {
            sign = "Cancer";
        }
    } else if (parseInt(month) === 8) {
        if (parseInt(day) >= 23) {
            sign = "Virgo";
        } else {
            sign = "Leo";
        }
    } else if (parseInt(month) === 9) {
        if (parseInt(day) >= 24) {
            sign = "Libra";
        } else {
            sign = "Virgo";
        }
    } else if (parseInt(month) === 10) {
        if (parseInt(day) >= 24) {
            sign = "Scorpio";
        } else {
            sign = "Libra";
        }
    } else if (parseInt(month) === 11) {
        if (parseInt(day) >= 23) {
            sign = "Sagittarius";
        } else {
            sign = "Scorpio";
        }
    } else if (parseInt(month) === 12) {
        if (parseInt(day) >= 22) {
            sign = "Capricorn";
        } else {
            sign = "Sagittarius";
        }
    }
    return sign;
}

function getNewZodiac(day, month) {
    "use strict";
    var sign = "Unknown";
    if (parseInt(month) === 1) {
        if (parseInt(day) >= 9) {
            sign = translateStarSign("Capricorn");
        } else {
            sign = translateStarSign("Sagittarius");
        }
    } else if (parseInt(month) === 2) {
        if (parseInt(day) >= 16) {
            sign = translateStarSign("Aquarius");
        } else {
            sign = translateStarSign("Capricorn");
        }
    } else if (parseInt(month) === 3) {
        if (parseInt(day) >= 12) {
            sign = translateStarSign("Pisces");
        } else {
            sign = translateStarSign("Aquarius");
        }
    } else if (parseInt(month) === 4) {
        if (parseInt(day) >= 19) {
            sign = translateStarSign("Aries");
        } else {
            sign = translateStarSign("Pisces");
        }
    } else if (parseInt(month) === 5) {
        if (parseInt(day) >= 14) {
            sign = translateStarSign("Taurus");
        } else {
            sign = translateStarSign("Aries");
        }
    } else if (parseInt(month) === 6) {
        if (parseInt(day) >= 20) {
            sign = translateStarSign("Gemini");
        } else {
            sign = translateStarSign("Taurus");
        }
    } else if (parseInt(month) === 7) {
        if (parseInt(day) >= 21) {
            sign = translateStarSign("Cancer");
        } else {
            sign = translateStarSign("Gemini");
        }
    } else if (parseInt(month) === 8) {
        if (parseInt(day) >= 10) {
            sign = translateStarSign("Leo");
        } else {
            sign = translateStarSign("Cancer");
        }
    } else if (parseInt(month) === 9) {
        if (parseInt(day) >= 16) {
            sign = translateStarSign("Virgo");
        } else {
            sign = translateStarSign("Leo");
        }
    } else if (parseInt(month) === 10) {
        if (parseInt(day) >= 31) {
            sign = translateStarSign("Libra");
        } else {
            sign = translateStarSign("Virgo");
        }
    } else if (parseInt(month) === 11) {
        if (parseInt(day) >= 23 && parseInt(day) <= 29) {
            sign = translateStarSign("Scorpio");
        } else if (parseInt(day) === 30) {
            sign = translateStarSign("Ophiuchus");
        } else {
            sign = translateStarSign("Libra");
        }
    } else if (parseInt(month) === 12) {
        if (parseInt(day) >= 18) {
            sign = translateStarSign("Sagittarius");
        } else {
            sign = translateStarSign("Ophiuchus");
        }
    }
    return sign;
}

function getLocale() {
    "use strict";
    var l_lang;
    if (navigator.userLanguage) { // Explorer
        l_lang = navigator.userLanguage;
    } else if (navigator.language) { // FF
        l_lang = navigator.language;
    } else {
        l_lang = "en-us";
    }
    return l_lang;
}

function getMonthName(month) { //Months in Javascript are 0 indexed. What a fucking nightmare.
    "use strict";
    var l_lang = getLocale();
    var date = new Date("2016", month, "10", 12, 0, 0);
    var retval = date.toLocaleString(l_lang, {
        month: "short"
    });
    if (retval.length > 5) {
        return month;
    }
    return retval;
}

function translateStarSign(sign) {
    "use strict";
    var locale = getLocale();
    var languageCode = locale.substring(0, (locale.indexOf('-') > -1 ? locale.indexOf('-') : locale.length));
    switch (languageCode) {
        case "de": //German
            switch (sign) {
                case "Cancer":
                    return "Krebs";
                case "Taurus":
                    return "Stier";
                case "Pisces":
                    return "Fische";
                case "Aries":
                    return "Widder";
                case "Libra":
                    return "Waage";
                case "Aquarius":
                    return "Wassermann";
                case "Capricorn":
                    return "Steinbock";
                case "Scorpio":
                    return "Skorpion";
                case "Virgo":
                    return "Jungfrau";
                case "Sagittarius":
                    return "Schütze";
                case "Gemini":
                    return "Zwillinge";
                case "Leo":
                    return "Löwe";
                case "Ophiuchus":
                    return "Schlangenträger";
                default:
                    return "Unbekannt";
            }
            break;
        case "it": //Italian
            switch (sign) {
                case "Cancer":
                    return "Cancro";
                case "Taurus":
                    return "Toro";
                case "Pisces":
                    return "Pesci";
                case "Aries":
                    return "Ariete";
                case "Libra":
                    return "Bilancia";
                case "Aquarius":
                    return "Acquario";
                case "Capricorn":
                    return "Capricorno";
                case "Scorpio":
                    return "Scorpione";
                case "Virgo":
                    return "Vergine";
                case "Sagittarius":
                    return "Sagittario";
                case "Gemini":
                    return "Gemelli";
                case "Leo":
                    return "Leone";
                case "Ophiuchus":
                    return "Ofiuco";
                default:
                    return "Data Errata";
            }
            break;
        case "nl": //Dutch
            switch (sign) {
                case "Cancer":
                    return "Kreeft";
                case "Taurus":
                    return "Stier";
                case "Pisces":
                    return "Vissen";
                case "Aries":
                    return "Ram";
                case "Libra":
                    return "Weegschaal";
                case "Aquarius":
                    return "Waterman";
                case "Capricorn":
                    return "Steenbok";
                case "Scorpio":
                    return "Schorpioen";
                case "Virgo":
                    return "Maagd";
                case "Sagittarius":
                    return "Boogschutter";
                case "Gemini":
                    return "Tweelingen";
                case "Leo":
                    return "Leeuw";
                case "Ophiuchus":
                    return "Slangendrager";
                default:
                    return "Onbekend";
            }
            break;
        case "ro": //Romanian
            switch (sign) {
                case "Cancer":
                    return "Rac";
                case "Taurus":
                    return "Taur";
                case "Pisces":
                    return "Pesti";
                case "Aries":
                    return "Berbec";
                case "Libra":
                    return "Balanta";
                case "Aquarius":
                    return "Varsator";
                case "Capricorn":
                    return "Capricorn";
                case "Scorpio":
                    return "Scorpion";
                case "Virgo":
                    return "Fecioara";
                case "Sagittarius":
                    return "Sagetator";
                case "Gemini":
                    return "Gemeni";
                case "Leo":
                    return "Leu";
                case "Ophiuchus":
                    return "Ophiuchus";
                default:
                    return "Necunoscut";
            }
            break;
        case "ru": //Russian
            switch (sign) {
                case "Cancer":
                    return "Рак";
                case "Taurus":
                    return "Телец";
                case "Pisces":
                    return "Рыбы";
                case "Aries":
                    return "Овен";
                case "Libra":
                    return "Весы";
                case "Aquarius":
                    return "Водолей";
                case "Capricorn":
                    return "Козерог";
                case "Scorpio":
                    return "Скорпион";
                case "Virgo":
                    return "Дева";
                case "Sagittarius":
                    return "Стрелец";
                case "Gemini":
                    return "Близнецы";
                case "Leo":
                    return "Лев";
                case "Ophiuchus":
                    return "Змееносец";
                default:
                    return "неизвестный";
            }
            break;
        case "pt": //Portuguese
            switch (sign) {
                case "Cancer":
                    return "Caranguejo";
                case "Taurus":
                    return "Touro";
                case "Pisces":
                    return "Peixes";
                case "Aries":
                    return "Carneiro";
                case "Libra":
                    return "Balança";
                case "Aquarius":
                    return "Aquário";
                case "Capricorn":
                    return "Capricórnio";
                case "Scorpio":
                    return "Escorpião";
                case "Virgo":
                    return "Virgem";
                case "Sagittarius":
                    return "Sagitário";
                case "Gemini":
                    return "Gémeos";
                case "Leo":
                    return "Leão";
                case "Ophiuchus":
                    return "Serpentário";
                default:
                    return "Data Inválida";
            }
            break;
        case "fi": //Finnish
            switch (sign) {
                case "Cancer":
                    return "Rapu";
                case "Taurus":
                    return "Härkä";
                case "Pisces":
                    return "Kalat";
                case "Aries":
                    return "Oinas";
                case "Libra":
                    return "Vaaka";
                case "Aquarius":
                    return "Vesimies";
                case "Capricorn":
                    return "Kauris";
                case "Scorpio":
                    return "Skorpioni";
                case "Virgo":
                    return "Neitsyt";
                case "Sagittarius":
                    return "Jousimies";
                case "Gemini":
                    return "Kaksoset";
                case "Leo":
                    return "Leijona";
                case "Ophiuchus":
                    return "Käärmeenkantaja";
                default:
                    return "Ei Tiedossa";
            }
            break;
        case "fr": //French
            switch (sign) {
                case "Cancer":
                    return "Cancer";
                case "Taurus":
                    return "Taureau";
                case "Pisces":
                    return "Poissons";
                case "Aries":
                    return "Bélier";
                case "Libra":
                    return "Balance";
                case "Aquarius":
                    return "Verseau";
                case "Capricorn":
                    return "Capricorne";
                case "Scorpio":
                    return "Scorpion";
                case "Virgo":
                    return "Vierge";
                case "Sagittarius":
                    return "Sagittaire";
                case "Gemini":
                    return "Gémeaux";
                case "Leo":
                    return "Lion";
                case "Ophiuchus":
                    return "Serpentaire";
                default:
                    return "Inconnu";
            }
            break;
        case "tr": //Turkish
            switch (sign) {
                case "Cancer":
                    return "Yengeç";
                case "Taurus":
                    return "Boğa";
                case "Pisces":
                    return "Balık";
                case "Aries":
                    return "Koç";
                case "Libra":
                    return "Terazi";
                case "Aquarius":
                    return "Kova";
                case "Capricorn":
                    return "Oğlak";
                case "Scorpio":
                    return "Akrep";
                case "Virgo":
                    return "Başak";
                case "Sagittarius":
                    return "Yay";
                case "Gemini":
                    return "İkizler";
                case "Leo":
                    return "Aslan";
                case "Ophiuchus":
                    return "Yılancı";
                default:
                    return "Bilinmiyor";
            }
            break;
        case "sv": //Swedish
            switch (sign) {
                case "Cancer":
                    return "Kräfta";
                case "Taurus":
                    return "Oxe";
                case "Pisces":
                    return "Fisk";
                case "Aries":
                    return "Vädur";
                case "Libra":
                    return "Våg";
                case "Aquarius":
                    return "Vattenman";
                case "Capricorn":
                    return "Stenbock";
                case "Scorpio":
                    return "Skorpion";
                case "Virgo":
                    return "Jungfru";
                case "Sagittarius":
                    return "Skytt";
                case "Gemini":
                    return "Tvilling";
                case "Leo":
                    return "Lejon";
                case "Ophiuchus":
                    return "Ormbärare";
                default:
                    return "Okänd";
            }
            break;
        default:
            return sign;
    }
}
//Tap and hold functionality for iOS

$(function() {
    "use strict";
    $("#btnperc").bind("taphold", tapholdHandler);

    function tapholdHandler(event) {
        showOptions();
    }
});

$(function() {
    "use strict";
    $("#btnac").bind("taphold", acLongPress);

});

$(function() {
    "use strict";
    $("#btnEquals").bind("taphold", eqLongPress);

});

function vibrate(time) {
    "use strict";
    try {
        navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
        if ("vibrate" in navigator) {
            // vibration API supported
            navigator.vibrate(time);
        } else {
            console.log("Vibration API not supported");
        }
    } catch (ex) {
        console.log("Vibration API error");
    }
}

function getMonth(index) {
    index = index - 1;
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[index];
}

function showPiCalcInfoInRevealScreen() {
    if (!piResponse) {
        return;
    }
    document.getElementById('btn1').innerHTML = `Pg:<br>${piResponse.page}`;
    document.getElementById('btn2').innerHTML = `Ln:<br>${piResponse.line}`;
    document.getElementById('btn3').innerHTML = `Acr:<br>${piResponse.across}`;
}

function getPiCalc() {
    console.log('Start of Pi Calc');
    const piCalc = localStorage.getItem('PiCalc');
    if (!piCalc || piCalc !== 'true') {
        return;
    }
    let pinPos = localStorage.getItem('PinPos');
    if (!pinPos) {
        return;
    }
    pinPos = parseInt(pinPos);

    let operations = localStorage.getItem('operations');
    if (!operations) {
        return;
    }
    operations = JSON.parse(operations);
    if (!operations || operations.length === 0) {
        return;
    }
    if (operations.length < pinPos) {
        return;
    }
    const pin = operations[pinPos - 1];
    if (!pin) {
        return;
    }
    piResponse = undefined;
    const url = `//app.ellusionist.com/webapi/proxy.php?url=https://digitalmentalism.com/pi.php?code=${pin}`;
    fetch(
            url, {
                method: 'GET'
            }
        )
        .then(response => response.json())
        .then(res => {
            console.log(res);
            if (!res) {
                return;
            }
            if (!res.contents) {
                return;
            }
            piResponse = res.contents;
        })
        .catch(error => {
            debugger;
            console.error('error:', error);
        });

}
// pass the right index. For June, pass 6, and not 5
function getDayOfWeek(date, month, age) {
    console.log('Input to find day of the week', date, month, age);
    var dt = new Date();
    var currentMonth = dt.getMonth() + 1;
    var currentDate = dt.getDate();

    var birthYear;

    if (currentMonth < month) {
        birthYear = dt.getFullYear() - age - 1;
    } else if (currentMonth == month) {
        if (currentDate < date) {
            birthYear = dt.getFullYear() - age - 1;
        } else {
            birthYear = dt.getFullYear() - age;
        }
    } else {
        birthYear = dt.getFullYear() - age;
    }

    console.log('Birth Year', birthYear);
    var birthDateObj = new Date(birthYear, month - 1, date);

    var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thur";
    weekday[5] = "Fri";
    weekday[6] = "Sat";

    var birthDay = weekday[birthDateObj.getDay()];
    console.log(`Birth Day: ${birthDay}, Birth Year: ${birthYear}`);
    return birthDay + ', ' + birthYear;

}