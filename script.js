var calc;
$('document').ready(function(){
    calc = new calculator();
    $('#equals').on('click',function(){
        calc.equate();
        console.log(calc.arr);
    });
    $('#decimal').on('click',function(){
        calc.decimal($(this).text());
        console.log(calc.arr);
    });
    $('.numbers .btn').on('click',function(){
        calc.addinputs($(this).text())
    });
    $('.operator-side .btn').on('click',function(){
        calc.addinputs($(this).text())
    })
});


var calculator = function(val) {
    var self = this;
    var calculatorarray = [];
    var displayvalue = 0;
    self.arr = calculatorarray;

    Object.defineProperty(self, 'doesOperatorExist', {
        get: function () {
            var check = false;
            for (var i = 0; i < calculatorarray.length; i++) {
                if (calculatorarray[i].isOperator) {
                    check = true;
                }
            }
            return check;
        }
    });
    self.decimal = function(val){
        var firstitem = self.arr[0];
        var lastitem = self.arr[self.arr.length-1];
        if(self.arr.length === 0){
            var newdecimal = new number('0');
            newdecimal.val = '0.';
            self.arr=[newdecimal];
        }
        if(lastitem.isNumber && !lastitem.decimal){
            lastitem.val = lastitem.val + "" + val;
            lastitem.decimal = true;
        }
    };
    self.addinputs = function (val) {
        var v = null;
        if (val == '='){
            console.log('equated');
            return;
        }
        if(val == '.'){
            console.log('decimal clicked');
            return;
        }
        else if (isNaN(parseFloat(val))) {
            v = new operator(val);
        }
        else {
            v = new number(val);
        }
        var firstentry = self.arr[0];
        var lastentry = self.arr[self.arr.length - 1];

        if (self.arr.length === 0 && v.isNumber) {
            self.arr.push(v);
            return;
        }
        if(self.arr.length === 0 && v.isOperator){
            console.log('illegal operator');
            return;
        }
        if (lastentry.isNumber) {
            if(v.isNumber){
                lastentry.val = lastentry.val + '' + v.val;
            }
            if(v.isOperator){
                self.arr.push(v);
            }
        }
        if (lastentry.isOperator) {
            if(v.isNumber){
                self.arr.push(v);
            }
            if(v.isOperator){
                lastentry.val = v.val;
            }
        }
        if(lastentry.isCalculation){
            if(v.isNumber){
                self.arr = [v];
            }
            if(v.isOperator){
                self.arr.push(v);
            }
        }
    };
    self.equate = function(){
        var firstitem = self.arr[0];
        var lastitem = self.arr[self.arr.length-1];
        if (self.arr.length == 1){
            if(firstitem.isCalculation){
                self.arr.push(firstitem.operator, firstitem.num2)
            }
            else if(firstitem.isNumber){
                return self.arr[0].val;
            }
        }
        if(self.arr.length == 2 && lastitem.isOperator){
            self.arr.push(new number(firstitem.val));
        }
        if(self.arr.length == 3){
            var calcu1 = new calculation(self.arr[0],self.arr[1],self.arr[2]);
            self.arr = [calcu1];
        }
        if (self.arr.length > 3 && lastitem.isNumber){
            while(self.arr.length > 1) {
                for (var i = 0; i < self.arr.length; i++) {
                    if (self.arr[i].isOperator) {
                        var calcu2 = new calculation(self.arr[i - 1], self.arr[i], self.arr[i + 1]);
                        self.arr[i - 1] = calcu2;
                        self.arr.splice(i, 2);
                    }
                }
            }
        }
    };
};

var calculatoritem = function(value){
    var self = this;
    self.val = value;
    Object.defineProperty(self , 'isNumber',{
        get: function() {
            return self instanceof number;
        }
    });
    Object.defineProperty(self , 'isOperator',{
        get: function() {
            return self instanceof operator;
        }
    });
    Object.defineProperty(self, 'isCalculation',{
        get: function() {
            return self instanceof calculation
        }
    })
};
var number = function(value){
    var hasdecimal = false;
    var self = this;
    calculatoritem.call(self, parseFloat(value));
};
var calculation = function (num1, op, num2) {
    var self = this;
    self.num1 = num1;
    self.num2 = num2;
    self.operator = op;
    var result = function(){
        return op.calculate(parseFloat(num1.val),parseFloat(num2.val))
    };
    calculatoritem.call(this,result());
};

var operator = function(value){
    var self = this;
    var order;
    switch(value){
        case '+':
            order = 0;
            break;
        case '-':
            order = 0;
            break;
        case 'x':
            order = 1;
            break;
        case '/':
            order = 1;
            break;
    }
    calculatoritem.call(self, value);
    self.calculate = function(num1,num2){
        var result;
        switch(value){
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case 'x':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
        }
        return result;
    }
};

