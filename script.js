var v = null;
$("document").ready(function(){
$("button").on('click', function(){
    var val = $(this).text();
    console.log(val);
        if (isNaN(parseFloat(val))){
            switch(val){
                case "+":
                    v = {
                        type: "operator",
                        value: val
                    };
                    break;
                case "-":
                    v = {
                        type: "operator",
                        value: val
                    };
                    break;
                case "/":
                    v = {
                        type: "operator",
                        value: val
                    };
                    break;
                case "x":
                    v = {
                        type: "operator",
                        value: val
                    };
                    break;
                case "=":
                    v = {
                        type: "equalSign",
                        value: val
                    };
                    break;
            }
        }
        else {
            v = {
                type: "number",
                value: val
            };
        }
})
})


