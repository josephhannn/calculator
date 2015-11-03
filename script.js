var calcresult;
var calcarr = [];
$("document").ready(function() {
    $("button").on('click', function () {
        var val = $(this).text();
        switch(val){
            case "AC":
                allclear();
                break;
            case "C":
                clearlast();
                break;
            default:
                input(val);
                break;
        }

    });
});
    var input = function (val) {
        var v = null;
        var lastitem;
        console.log(val);
        var firstitem = (calcarr.length > 0) ? calcarr[0] : new createitem();
        if (isNaN(parseFloat(val))) {
            v = createitem(val);
        }
        else {
            v = number(val);
        }
        if (calcarr.length === 0 && v.type == "number") {
            calcarr.push(v);
            $(".display h4").text(v.val);
        }
        if (calcarr.length > 0) {
            console.log("first number is " + firstitem.val);
            lastitem = calcarr[calcarr.length - 1];
            console.log("lastitem is " + lastitem.val);
        }
        if (calcarr.length == 1 && v.type == "number" && lastitem.val == "0"){
            calcarr[0] = v;
            $(".display h4").text(v.val);
        }
        if (v.type == "number" && lastitem.type == "number" && v != calcarr[0]) {
            lastitem.val = lastitem.val + "" + v.val;
            $('.display h4').text(lastitem.val);
            if (lastitem.decimal == true){
                v.decimal == true;
            }
        }
        if (calcarr.length > 0 && v.type == "operator" && lastitem.type == "operator") {
            console.log(lastitem);
            lastitem.val = v.val;
            $('.display h4').text(lastitem.val);
        }
        if (calcarr.length > 0 && v.type == "operator" && lastitem.type == "number") {
            calcarr.push(v);
            console.log("last item after op is " + lastitem.val);
            console.log("first number after op is " + firstitem.val);
            $('.display h4').text(v.val);
        }
        if (calcarr.length == 1 && v.type == "equalSign" && lastitem.type == "number"){
            $(".display h4").text(lastitem.val);
        }
        if (calcarr.length > 0 && v.type == "decimal" && lastitem.type == "number"){
            if (firstitem.calcu == true) {
                calcarr = [];
                calcarr[0] = new number("0.");
                $(".display h4").text(calcarr[0].val);
            }
            else if (lastitem.decimal == false) {
                lastitem.val = lastitem.val + v.val;
                $(".display h4").text(lastitem.val);
                lastitem.decimal = true;
            }
        }
        if (calcarr.length == 2 && v.type == "number" && lastitem.type == "operator") {
            v.decimal = false;
            calcarr.push(v);
            $('.display h4').text(v.val);
        }
        if (calcarr.length == 2 && v.type == "equalSign" && lastitem.type == "operator") {
            calcarr.push(calcarr[0]);
            console.log(calcarr);
            calcresult = calculate(calcarr[0].val, calcarr[1].val, calcarr[2].val);
            console.log(calcresult);
            var r = new number(calcresult);
            if (calcresult == "Infinity") {
                $('.display h4').text("Error")
            }
            else {
                $('.display h4').text(r.val);
            }

        }
        if (calcarr.length > 3 && v.type == "operator" && calcarr[0].calcu == true){
            calcarr.splice(1, 3, v);

        }
        if (calcarr.length > 3 && v.type == "operator" && calcarr[0].calcu != true){
            calcresult = calculate(calcarr[0].val, calcarr[1].val, calcarr[2].val);
            console.log(calcresult);
            if (calcresult == "Infinity"){
                $('.display h4').text("Error")
            }
            else {
                calcresult = new number(calcresult);
                calcarr = [];
                calcarr[0] = calcresult;
                calcarr.push(v);
                $('.display h4').text(v.val);
                calcresult = 0;
            }
        }
        if (calcarr.length == 3 && v.type == "equalSign") {
            calcresult = calculate(calcarr[0].val, calcarr[1].val, calcarr[2].val);
            console.log(calcresult);
            if (calcresult == "Infinity"){
                $('.display h4').text("Error")
            }
            else {
                calcresult = new number(calcresult);
                calcresult.calcu = true;
                calcarr[0] = calcresult;
                $('.display h4').text(calcresult.val);
                calcresult = 0;
            }
        }


    };

    var number = function (value) {
        var obj = {
            type: "number",
            val: value,
            calcu: false,
            decimal: false
        };
        return obj;
    };

    function createitem(operator) {
        var obj;
        switch (operator) {
            case '+':
                obj = {
                    type: "operator",
                    val: operator
                };
                break;
            case '-':
                obj = {
                    type: "operator",
                    val: operator
                };
                console.log(obj);
                break;
            case '/':
                obj = {
                    type: "operator",
                    val: operator
                };
                console.log(obj);
                break;
            case 'x':
                obj = {
                    type: "operator",
                    val: operator
                };
                console.log(obj);
                break;
            case '=':
                obj = {
                    type: "equalSign",
                    val: operator
                };
                console.log(obj);
                break;
            case ".":
                obj = {
                    type: "decimal",
                    val: operator
                };
                break;
        }
        return obj;
    }

    function calculate(num1, op, num2) {
        var r;
        switch (op) {
            case "+":
                r = parseFloat(num1) + parseFloat(num2);
                break;
            case "-":
                r = parseFloat(num1) - parseFloat(num2);
                break;
            case "x":
                r = parseFloat(num1) * parseFloat(num2);
                break;
            case "/":
                r = parseFloat(num1) / parseFloat(num2);
                break;
        }
        return r;
    }
    function allclear() {
        calcarr = [];
        calcresult = 0;
        $('.display h4').text('');
    }
    function clearlast() {
        calcarr.pop();
        if (calcarr.length === 0){
            $('.display h4').text('0');
        }
        else {$('.display h4').text(calcarr[calcarr.length-1].val)}
    }





