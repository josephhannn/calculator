var calc;
$('document').ready(function(){
    calc = new calculator();
    $('#equals').on('click',function(){
        calc.equate();
        console.log(calc.arr);
        calc.display();
    });
    $('#decimal').on('click',function(){
        calc.decimal($(this).text());
        console.log(calc.arr);
    });
    $('.numbers .btn').on('click',function(){
        calc.add_inputs($(this).text());
        calc.display();
    });
    $('.operator-side .btn').on('click',function(){
        calc.add_inputs($(this).text());
        calc.display();
    });
    $('.AC').on('click',function(){
        calc.allclear();
    });
    $('.showhistory').on('click',function(){
        calc.history_display();
    })
});


var calculator = function(val) {
    var self = this;
    var calculator_array = [];
    var calc_history = [];
    self.arr = calculator_array;
    self.history = calc_history;

    Object.defineProperty(self, 'doesOperatorExist', {
        get: function () {
            var check = false;
            for (var i = 0; i < self.arr.length; i++) {
                if (self.arr[i].isOperator) {
                    check = true;
                }
            }
            return check;
        }
    });
    self.display = function(){
        for(var i=0;i<self.arr.length;i++){
            var display = self.arr[i].val
        }
        $('.display h4').text(display);
    };
    self.allclear = function(){
        self.arr = [];
        $('.display h4').text('0');
    };
    self.decimal = function(val){
        var last_item = self.arr[self.arr.length-1];
        if(self.arr.length === 0){
            var new_decimal = new number('0');
            new_decimal.val = '0.';
            new_decimal.decimal = true;
            self.arr=[new_decimal];
            return;
        }
        if(last_item.isNumber && !last_item.decimal){
            last_item.val = last_item.val + "" + val;
            last_item.decimal = true;
        }
    };
    self.history_display = function(){
        $('.history li').remove();
        for(var i = 0 ; i<self.history.length;i++){
            var entry = $('<li>').text(
                self.history[i].num1.val+''+self.history[i].operator.val+''+self.history[i].num2.val+'='+self.history[i].val);
            $('.history').append(entry)
        }
    };
    self.add_inputs = function (val) {
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
        var last_entry = self.arr[self.arr.length - 1];

        if (self.arr.length === 0 && v.isNumber) {
            self.arr.push(v);
            return;
        }
        if(self.arr.length === 0 && v.isOperator){
            console.log('illegal operator');
            return;
        }
        if (last_entry.isNumber) {
            if(last_entry.val === 0){
                self.arr[self.arr.length-1] = v;
                return;
            }
            if(v.isNumber){
                last_entry.val = last_entry.val + '' + v.val;
            }
            if(v.isOperator){
                self.arr.push(v);
            }
        }
        if (last_entry.isOperator) {
            if(v.isNumber){
                self.arr.push(v);
            }
            if(v.isOperator){
                self.arr[self.arr.length - 1] = v;
            }
        }
        if(last_entry.isCalculation){
            if(v.isNumber){
                self.arr = [v];
            }
            if(v.isOperator){
                self.arr.push(v);
            }
        }
    };
    self.equate = function(){
        var first_item = self.arr[0];
        var last_item = self.arr[self.arr.length-1];
        if (self.arr.length === 0){
            $('.display h4').text('0');
        }
        if (self.arr.length == 1){
            if(first_item.isCalculation){
                self.arr.push(first_item.operator, first_item.num2)
            }
            else if(first_item.isNumber){
                return self.arr[0].val;
            }
        }
        if(self.arr.length == 2 && last_item.isOperator){
            self.arr.push(new number(first_item.val));
        }
        if(self.arr.length == 3){
            var new_calculation = new calculation(self.arr[0],self.arr[1],self.arr[2]);
            if (new_calculation.val === Infinity){
                new_calculation.val = 'Error'
            }
            self.arr = [new_calculation];
            self.history.push(new_calculation);
        }
        if (self.arr.length > 3 && last_item.isOperator){
            while(self.arr.length > 2) {
                for (var i = 0; i < self.arr.length; i++) {
                    if (self.arr[i].isOperator && self.arr[i+1].isNumber) {
                        new_calculation = new calculation(self.arr[i - 1], self.arr[i], self.arr[i + 1]);
                        self.arr[i - 1] = new_calculation;
                        self.arr.splice(i, 2);
                        self.history.push(new_calculation);
                    }
                }
            }
            self.equate();
        }
        if (self.arr.length > 3 && last_item.isNumber){
            var oop_check;
            while(self.arr.length > 1) {
                for(var o = 0 ; o<self.arr.length;o++){
                    //scan array check for priority operators AKA x or /
                    if(self.arr[o].isOperator && self.arr[o].priority){
                        //when true calculate that operation first
                        for (var k = 0; k < self.arr.length; k++) {
                            if (self.arr[k].isOperator && self.arr[k].priority) {
                                    new_calculation = new calculation(self.arr[k - 1], self.arr[k], self.arr[k + 1]);
                                    self.arr[k - 1] = new_calculation;
                                    self.arr.splice(k, 2);
                                    self.history.push(new_calculation);
                            }
                            else {
                                    continue;
                            }
                            }
                    }
                }
                //when there are no priority operators in array continue as normal
                for (var l = 0; l < self.arr.length; l++) {
                    if (self.arr[l].isOperator) {
                        new_calculation = new calculation(self.arr[l - 1], self.arr[l], self.arr[l + 1]);
                        self.arr[l - 1] = new_calculation;
                        self.arr.splice(l, 2);
                        self.history.push(new_calculation);
                    }
                }
            }
        }
    };
};

var calculator_item = function(value){
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
    calculator_item.call(self, parseFloat(value));
};
var calculation = function (num1, op, num2) {
    var self = this;
    self.num1 = num1;
    self.num2 = num2;
    self.operator = op;
    var result = function(){
        return op.calculate(parseFloat(num1.val),parseFloat(num2.val))
    };
    calculator_item.call(this,result());
};

var operator = function(value){
    var self = this;
    var priority;
    switch(value){
        case '+':
            priority = false;
            break;
        case '-':
            priority = false;
            break;
        case 'x':
            priority = true;
            break;
        case '/':
            priority = true;
            break;
    }
    self.priority = priority;
    calculator_item.call(self, value);
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

