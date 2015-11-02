var displayval;
var calcarr = [];
$("document").ready(function() {
    $("button").on('click', function () {
        var val = $(this).text();

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
            }
            if (calcarr.length > 0) {
                console.log("first number is " + firstitem.val);
                lastitem = calcarr[calcarr.length - 1];
                console.log("lastitem is " + lastitem.val);
            }
            if (v.type == "number" && lastitem.type == "number" && v != calcarr[0]) {
                lastitem.val = lastitem.val + "" + v.val;
            }
            if (calcarr.length > 0 && v.type == "operator" && lastitem.type == "operator") {
                console.log(lastitem);
                lastitem.val = v.val;
            }
            if (calcarr.length > 0 && v.type == "operator" && lastitem.type == "number") {
                calcarr.push(v);
                console.log("last item after op is " + lastitem.val);
                console.log("first number after op is " + firstitem.val);
            }
            if (calcarr.length == 2 && v.type == "number" && lastitem.type == "operator") {
                calcarr.push(v);
            }
            if (calcarr.length == 3 && v.type == "equalSign") {
                displayval = calculate(calcarr[0].val, calcarr[1].val, calcarr[2].val);
                calcarr = [];
                console.log(displayval);
                calcarr[0] = displayval;
            }
        };

        var number = function (value) {
            var obj = {
                type: "number",
                val: value
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
                    r = parseFloat(num1) + parseFloat(num2);
                    break;
            }
            return r;
        }
    }
});


