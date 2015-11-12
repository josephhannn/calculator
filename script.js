var calculator = function(){
    var self = this;
    var calculatorarray = [];
    var displayvalue = 0;
    var v = null;

    self.addinputs = function(val){
        if(isNaN(parseFloat(val))){
            v = self.createitem(val);
        }
        else {
            v = new number(val);
        }
    };
    self.createitem = function(){
        var r = new calculatoritem();
        switch (operator) {
            case '+':
                r = new plus();
                break;
            case '-':
                r = new subtract();
                break;
            case '/':
                r = new divide();
                break;
            case 'x':
                r = new multiple();
                break;
            case '=':
                r = new equalSign();
                break;
        }

        return r;
    }

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
    Object.defineProperty(self , 'isequalSign',{
        get: function() {
            return self instanceof equalSign;
        }
    });
    Object.defineProperty(self , 'isCalculation',{
        get: function() {
            return self instanceof calculation;
        }
    });
};
var number = function(value){
    var self = this;
    calculatoritem.call(self, parseFloat(val));
};
var operator = function(value){
    var self = this;
    calculatoritem.call(self, value);
    operator.calculate = function(num1,num2){
       var n1 = num1;
        var n2 = num2;
        var r1;
        var r2;
        if(typeof num1 == 'number'){
            n1 = new number(num1);
        }
        if(typeof num2 == 'number'){
            n2 = new number(num2)
        }
        r1 = parseFloat(num1.val);
        r2 = parseFloat(num2.val);
        return [r1,r2]
    }
};
var plus = function(){
    var self = this;
    operator.call(self, '+');
    self.calculate = function(num1,num2){
        var answer = operator.calculate.call(this,num1,num2);
        return answer[1] + answer[2]
    }
};
var calculation = function (num1, op, num2) {
    var self = this;
    self.num1 = num1;
    self.num2 = num2;
    self.operator = op;
    calculatoritem.call(self, function () {
        var calculatedValue = op.calculate(num1, num2);
        return calculatedValue;
    });

    self.calculate = function () {
        return op.calculate(num1, self.val);
    }
};