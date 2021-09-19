// Cipher, Copyright 2016 Ellusionist.com, Inc
function resize(box, initialsize) {
    "use strict";
    $(box).each(function(i, box) {
        var width = $(box).width(),
            html = '<span style="white-space:nowrap">',
            line = $(box).wrapInner(html).children()[0],
            n = initialsize;

        $(box).css('font-size', n);

        while ($(line).width() > width) {
            $(box).css('font-size', --n);
        }

        $(box).text($(line).text());

    });
}
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        "use strict";
        FastClick.attach(document.body);
    }, false);
}

var viewportwidth;
var viewportheight;
var tablewidth;
var tableheight;
var fieldheight;
//var horizontal = true;
function rotationhandler() {
    "use strict";
    /*if(LockOrientatioliznBeforeClear === true && cancelAfterEquals === false)
    	{
    		
    		return;
    	}
    	else if(LockOrientationBeforeClear === true && firstThingDone === false)
    	{
    		return;
    	}
    	else
    	{*/
    layout();
    //}
}

function getButtonHeight() {
    'use strict';
    var cellheight = (viewportwidth / 4) - 4;
    if (iOS11) {
        cellheight -= 17;
    }
    return cellheight;
}

function layout() {
    "use strict";
    /*
    	if (typeof window.innerWidth !== 'undefined') { //sets viewport width/height into respective variables
    		//alert("Method 1");
        	//viewportwidth = window.innerWidth; 
    		viewportwidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth);
    		viewportheight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight);
    		//viewportheight = window.innerHeight;
    	} else if (typeof document.documentElement !== 'undefined' && typeof document.documentElement.clientWidth !== 'undefined' && document.documentElement.clientWidth !== 0) {
    		//alert("Method 2");
    	    viewportwidth = document.documentElement.clientWidth; 
    		viewportheight = document.documentElement.clientHeight;
    	} else {
    		//alert("Method 3");
        	viewportwidth = document.getElementsByTagName('body')[0].clientWidth; 
    		viewportheight = document.getElementsByTagName('body')[0].clientHeight;
    	}*/
    viewportheight = $(window).height();
    viewportwidth = $(window).width();
    /*if(horizontal)
    {
    	var vpw = viewportwidth;
    	var vph = viewportheight;
    	viewportwidth = vph;
    	viewportheight = vpw;
    }*/
    viewportwidth = viewportwidth + 2;
    tablewidth = viewportwidth; //sets table width to viewport width
    tableheight = Math.round(tablewidth / 100 * 125);
    fieldheight = viewportheight - tableheight;
    document.getElementById('calculatorbuttons').style.width = tablewidth + "px";
    document.getElementById('calculatorbuttons').style.height = tableheight + "px";
    document.getElementById('calcField').style.height = fieldheight + "px";
    document.getElementById('revealTable').style.width = viewportheight + "px";
    document.getElementById('revealTable').style.height = viewportwidth + "px";
    console.log('Calc field Height.....', fieldheight);
    var cellheight = getButtonHeight(); //(viewportwidth/4) - 4;
    if (iOS11) {
        //cellheight -=15; - Handled by getButtonHeight
        document.getElementById('calculatorbuttons').cellSpacing = "12";
        document.getElementById('calculatorbuttons').border = "0";
        //document.getElementById("calculatorbuttons").className += " ios11";
        //document.getElementById("wholecontaine").className += " ios11";
        $('#wholecontainer').addClass("ios11");
        $('#calculatorbuttons').addClass("ios11");

        $('.numberButton').addClass("numberButtonios11");
        $('.operationButton').addClass("operationios11");
        $('.topButton').addClass("topButtonios11");

        $('.numberButton').removeClass("numberButton");
        $('.operationButton').removeClass("operationButton");
        $('.topButton').removeClass("topButton");



        $('#calcField').addClass("ios11");
        $("html").css({
            backgroundColor: "#000"
        });
        $("body").css({
            backgroundColor: "#000"
        });

    }
    //alert(viewportheight);
    /*
	document.getElementById("btnac").style.height = cellheight + "px";
	document.getElementById("btninv").style.height = cellheight + "px";
	document.getElementById("btnperc").style.height = cellheight + "px";
	document.getElementById("btndivide").style.height = cellheight + "px";
	document.getElementById("btn7").style.height = cellheight + "px";
	document.getElementById("btn8").style.height = cellheight + "px";
	document.getElementById("btn9").style.height = cellheight + "px";
	document.getElementById("btnMultiply").style.height = cellheight + "px";
	document.getElementById("btn4").style.height = cellheight + "px";
	document.getElementById("btn5").style.height = cellheight + "px";
	document.getElementById("btn6").style.height = cellheight + "px";
	document.getElementById("btnMinus").style.height = cellheight + "px";
	document.getElementById("btn1").style.height = cellheight + "px";
	document.getElementById("btn2").style.height = cellheight + "px";
	document.getElementById("btn3").style.height = cellheight + "px";
	document.getElementById("btnAdd").style.height = cellheight + "px";
	document.getElementById("btn0").style.height = cellheight + "px";
	document.getElementById("btnDecimal").style.height = cellheight + "px";
	document.getElementById("btnEquals").style.height = cellheight + "px";
	
	document.getElementById("btnac").style.width = cellheight + "px";
	document.getElementById("btninv").style.width = cellheight + "px";
	document.getElementById("btnperc").style.width = cellheight + "px";
	document.getElementById("btndivide").style.width = cellheight + "px";
	document.getElementById("btn7").style.width = cellheight + "px";
	document.getElementById("btn8").style.width = cellheight + "px";
	document.getElementById("btn9").style.width = cellheight + "px";
	document.getElementById("btnMultiply").style.width = cellheight + "px";
	document.getElementById("btn4").style.width = cellheight + "px";
	document.getElementById("btn5").style.width = cellheight + "px";
	document.getElementById("btn6").style.width = cellheight + "px";
	document.getElementById("btnMinus").style.width = cellheight + "px";
	document.getElementById("btn1").style.width = cellheight + "px";
	document.getElementById("btn2").style.width = cellheight + "px";
	document.getElementById("btn3").style.width = cellheight + "px";
	document.getElementById("btnAdd").style.width = cellheight + "px";
	document.getElementById("btn0").style.width = cellheight + "px";
	document.getElementById("btnDecimal").style.width = cellheight + "px";
	document.getElementById("btnEquals").style.width = cellheight + "px";
	*/
    $(".button").css({
        width: cellheight + "px"
    });
    $(".button").css({
        height: cellheight + "px"
    });
    $(".button").css({
        maxWidth: cellheight + "px"
    });
    $(".button").css({
        maxHeight: cellheight + "px"
    });
    //console.log(viewportheight);
}

function doOnOrientationChange() {
    "use strict";
    console.log("Orientation Change");
    switch (window.orientation) {
        case -90:
            /*if(LockOrientationBeforeClear === true && cancelAfterEquals === false)
		{
			document.getElementById("body").style.transform = "rotate(90deg)"; 
			document.getElementById("body").style.width = viewportwidth+"px";
			document.getElementById("body").style.height = viewportheight+"px";
			document.getElementById("body").style.top = "-39%";
			document.getElementById("body").style.left = "21.75%";
			document.getElementById("body").style.position = "fixed";
			horizontal = true;
			layout();
		}
		else
		{*/
            document.getElementById('wholecontainer').style.display = "none"; //was calculatorbuttons
            document.getElementById('calcField').style.display = "none";
            document.getElementById('revealTable').style.display = "table";
            resize(".revealcell", 50);
            //}
            break;
        case 90:
            /*if(LockOrientationBeforeClear === true && cancelAfterEquals === false)
		{
			document.getElementById("body").style.transform = "rotate(-90deg)"; 
			document.getElementById("body").style.width = viewportwidth+"px";
			document.getElementById("body").style.height = viewportheight+"px";
			document.getElementById("body").style.position = "fixed";
			document.getElementById("body").style.top = "-39%";
			document.getElementById("body").style.left = "21.75%";
			horizontal = true;
			layout();
		}
		else
		{*/
            document.getElementById('wholecontainer').style.display = "none";
            document.getElementById('calcField').style.display = "none";
            document.getElementById('revealTable').style.display = "table";
            resize(".revealcell", 50);
            //}
            break;
        default:
            //Comment the following three lines to test in landscape on desktop safari
            document.getElementById('wholecontainer').style.display = "inherit"; //"table";
            document.getElementById('calcField').style.display = "inherit";
            document.getElementById('revealTable').style.display = "none";

            /*document.getElementById("body").style.transform = "";//"rotate(-90deg)"; 	 
            document.getElementById("body").style.width = viewportwidth+"px";
            document.getElementById("body").style.height = viewportheight+"px";
            document.getElementById("body").style.top = "";
            document.getElementById("body").style.left = "";
            document.getElementById("body").style.position = "fixed";*/
            //	horizontal = false;
            //layout();

            //For testing landscape in desktop safari
            /*
            	document.getElementById('calculatorbuttons').style.display = "none";
            	document.getElementById('calcField').style.display = "none";
            	document.getElementById('revealTable').style.display = "table";	
            	*/
            break;
    }
}

window.addEventListener('orientationchange', doOnOrientationChange);

function BlockElasticScroll(event) {
    "use strict";
    event.preventDefault();
}

var BirthdayInput;
var BirthdayDayPosition;
var BirthdayMonthPosition;
var BirthdayYearPosition;
var YearMode;
var DisplayStarSign;
var Use13StarSigns;
var IgnoreRevealBeforeClear;
var HoldEqualsToReveal;
//var LockOrientationBeforeClear;
var UseToxicForce;
var ToxicForceNumber;
var ToxicRevealEqualsPressNumber;
var operations = [];
var iOS11 = false;
var IgnoreCalcResultsInReveal;
//var MonthDisplaysIncorrectly;
var DisplayMonthName;
var SMSKey;
var SMSOn;
var SMSTarget;
var SMSOnEqualsPress;
var SMSPreamble;
var SMSSendDelay;
var PostNotificationOn;
var PasscodeInput;
var PasscodePosition;


function iOSversion() {
    'use strict';
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
        // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
        var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
        return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
    }
}
var Licenced = true;
var LicenseKey = "";

function initialise() {
    "use strict";
    document.ontouchmove = function(event) {
        event.preventDefault();
    };

    if (localStorage.getItem("initialised") === null) {
        //...
        var ver = iOSversion();
        if (ver) {
            if (ver[0] >= 11) {
                iOS11 = true;
            }
        }
        BirthdayInput = true;
        BirthdayDayPosition = 1;
        BirthdayMonthPosition = 2;
        BirthdayYearPosition = 3;
        YearMode = false;
        DisplayStarSign = true;
        Use13StarSigns = false;
        IgnoreRevealBeforeClear = false;
        HoldEqualsToReveal = false;
        IgnoreCalcResultsInReveal = false;
        //LockOrientationBeforeClear = false;
        UseToxicForce = false;
        ToxicForceNumber = "";
        ToxicRevealEqualsPressNumber = 1;
        //MonthDisplaysIncorrectly = false;
        SMSOn = false;
        SMSOnEqualsPress = 3;
        SMSTarget = "";
        SMSPreamble = "";
        SMSSendDelay = 0;
        PostNotificationOn = false;
        PasscodeInput = false;
        PasscodePosition = 4;
        var emptyarray = [];
        localStorage.setItem("initialised", JSON.stringify(true));
        localStorage.setItem("iOS11Style", JSON.stringify(iOS11));
        localStorage.setItem("BirthdayInput", JSON.stringify(BirthdayInput));
        localStorage.setItem("BirthdayDayPosition", JSON.stringify(BirthdayDayPosition));
        localStorage.setItem("BirthdayMonthPosition", JSON.stringify(BirthdayMonthPosition));
        localStorage.setItem("BirthdayYearPosition", JSON.stringify(BirthdayYearPosition));
        localStorage.setItem("YearMode", JSON.stringify(YearMode));
        localStorage.setItem("DisplayStarSign", JSON.stringify(DisplayStarSign));
        localStorage.setItem("Use13StarSigns", JSON.stringify(Use13StarSigns));
        localStorage.setItem("IgnoreRevealBeforeClear", JSON.stringify(IgnoreRevealBeforeClear));
        localStorage.setItem("HoldEqualsToReveal", JSON.stringify(HoldEqualsToReveal));
        localStorage.setItem("IgnoreCalcResultsInReveal", JSON.stringify(IgnoreCalcResultsInReveal));
        //localStorage.setItem("LockOrientationBeforeClear", JSON.stringify(LockOrientationBeforeClear));
        localStorage.setItem("ToxicForce", JSON.stringify(UseToxicForce));
        localStorage.setItem("ToxicForceNumber", JSON.stringify(ToxicForceNumber));
        localStorage.setItem("ToxicRevealEqualsPressNumber", JSON.stringify(ToxicRevealEqualsPressNumber));
        localStorage.setItem("operations", JSON.stringify(operations));
        localStorage.setItem("fieldvalue", JSON.stringify("0"));
        localStorage.setItem("automaticallyUpdated", JSON.stringify(false));
        //localStorage.setItem("MonthDisplaysIncorrectly", JSON.stringify(false));
        localStorage.setItem("Licenced", JSON.stringify("XXXXXXX"));
        localStorage.setItem("DisplayMonthName", JSON.stringify(false));
        localStorage.setItem("SMS", JSON.stringify(SMSOn));
        localStorage.setItem("SMSOnEqualsPress", JSON.stringify(SMSOnEqualsPress));
        localStorage.setItem("SMSNumber", JSON.stringify(SMSTarget));
        localStorage.setItem("SMSPreamble", JSON.stringify(SMSPreamble));
        localStorage.setItem("SMSSendDelay", JSON.stringify(SMSSendDelay));
        localStorage.setItem("PostNotificationOn", JSON.stringify(PostNotificationOn));
        localStorage.setItem("PasscodeInput", JSON.stringify(PasscodeInput));
        localStorage.setItem("PasscodePosition", JSON.stringify(PasscodePosition));
        //localStorage.setItem("Licenced", JSON.stringify(false));
    } else {
        Licenced = JSON.parse(localStorage.getItem("Licenced"));
        if (Licenced === null) {
            Licenced = true;
        }
        LicenseKey = JSON.parse(localStorage.getItem("LicenseKey"));
        iOS11 = JSON.parse(localStorage.getItem("iOS11Style"));
        BirthdayInput = JSON.parse(localStorage.getItem("BirthdayInput"));
        BirthdayDayPosition = JSON.parse(localStorage.getItem("BirthdayDayPosition"));
        BirthdayMonthPosition = JSON.parse(localStorage.getItem("BirthdayMonthPosition"));
        BirthdayYearPosition = JSON.parse(localStorage.getItem("BirthdayYearPosition"));
        YearMode = JSON.parse(localStorage.getItem("yearmode"));
        DisplayStarSign = JSON.parse(localStorage.getItem("DisplayStarSign"));
        Use13StarSigns = JSON.parse(localStorage.getItem("Use13StarSigns"));
        IgnoreRevealBeforeClear = JSON.parse(localStorage.getItem("IgnoreRevealBeforeClear"));
        HoldEqualsToReveal = JSON.parse(localStorage.getItem("HoldEqualsToReveal"));
        IgnoreCalcResultsInReveal = JSON.parse(localStorage.getItem("IgnoreCalcResultsInReveal"));
        //LockOrientationBeforeClear = JSON.parse(localStorage.getItem("LockOrientationBeforeClear"));
        UseToxicForce = JSON.parse(localStorage.getItem("ToxicForce"));
        ToxicForceNumber = JSON.parse(localStorage.getItem("ToxicForceNumber"));
        ToxicRevealEqualsPressNumber = JSON.parse(localStorage.getItem("ToxicRevealEqualsPressNumber"));
        operations = JSON.parse(localStorage.getItem("operations")); //Array. Use operations.push(var) to add to the end of it
        //MonthDisplaysIncorrectly = JSON.parse(localStorage.getItem("MonthDisplaysIncorrectly"));
        DisplayMonthName = JSON.parse(localStorage.getItem("DisplayMonthName"));
        SMSKey = JSON.parse(localStorage.getItem("SMSKey"));
        SMSOn = JSON.parse(localStorage.getItem("SMS"));
        SMSOnEqualsPress = JSON.parse(localStorage.getItem("SMSOnEqualsPress"));
        SMSTarget = JSON.parse(localStorage.getItem("SMSNumber"));
        SMSPreamble = JSON.parse(localStorage.getItem("SMSPreamble"));
        SMSSendDelay = JSON.parse(localStorage.getItem("SMSSendDelay"));
        PostNotificationOn = JSON.parse(localStorage.getItem("PostNotificationOn"));
        PasscodeInput = JSON.parse(localStorage.getItem("PasscodeInput"));
        PasscodePosition = JSON.parse(localStorage.getItem("PasscodePosition"));
        localStorage.setItem("automaticallyUpdated", JSON.stringify(false));
    }

    if (navigator.userAgent.toLowerCase().search('android') !== -1) {
        setTimeout(() => {
            layout();
        }, 400);
    } else {
        layout();
    }



}