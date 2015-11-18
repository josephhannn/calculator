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
        var lastitem = self.arr[self.arr.length-1];
        if(self.arr.length === 0){
            var newdecimal = new number('0');
            newdecimal.val = '0.';
            newdecimal.decimal = true;
            self.arr=[newdecimal];
            return;
        }
        if(lastitem.isNumber && !lastitem.decimal){
            lastitem.val = lastitem.val + "" + val;
            lastitem.decimal = true;
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
            if(lastentry.val === 0){
                self.arr[self.arr.length-1] = v;
                return;
            }
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
                self.arr[self.arr.length - 1] = v;
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
        if (self.arr.length === 0){
            $('.display h4').text('0');
        }
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
            if (calcu1.val === Infinity){
                calcu1.val = 'Error'
            }
            self.arr = [calcu1];
            self.history.push(calcu1);
        }
        if (self.arr.length > 3 && lastitem.isOperator){
            while(self.arr.length > 2) {
                for (var i = 0; i < self.arr.length; i++) {
                    if (self.arr[i].isOperator && self.arr[i+1].isNumber) {
                        var calcu2 = new calculation(self.arr[i - 1], self.arr[i], self.arr[i + 1]);
                        self.arr[i - 1] = calcu2;
                        self.arr.splice(i, 2);
                        self.history.push(calcu2);
                    }
                }
            }
            self.equate();
        }
        if (self.arr.length > 3 && lastitem.isNumber){
            var oop_check;
            while(self.arr.length > 1) {
                for(var o = 0 ; o<self.arr.length;o++){
                    if(self.arr[o].isOperator && self.arr[o].priority){
                        oop_check = true;
                        if(oop_check) {
                            for (var k = 0; k < self.arr.length; k++) {
                                if (self.arr[k].isOperator && self.arr[k].priority) {
                                    var calcu3 = new calculation(self.arr[k - 1], self.arr[k], self.arr[k + 1]);
                                    self.arr[k - 1] = calcu3;
                                    self.arr.splice(k, 2);
                                    self.history.push(calcu3);
                                }
                                else {
                                    continue;
                                }
                            }
                        }
                    }
                }
                for (var l = 0; l < self.arr.length; l++) {
                    if (self.arr[l].isOperator) {
                        var calcu4 = new calculation(self.arr[l - 1], self.arr[l], self.arr[l + 1]);
                        self.arr[l - 1] = calcu4;
                        self.arr.splice(l, 2);
                        self.history.push(calcu4);
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

