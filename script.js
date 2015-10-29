var my_calculator = new calculator(callback);
function callback(type,value,item){
    /*switch(type){
        case "itemAdded":
            break;
        case "calculated":
            break;
        case "error":
            break;
    }*/
    switch(value){
        case undefined:
            $(".display h4").text("");
            break;
        default:
            $(".display h4").text(displayarea);
    }
}
$("document").ready(function(){
$("button").on('click', function(){
    var val = $(this).text();
    console.log(val);
    switch(val){
        case "AC":
            my_calculator.allClear();
            break;
        default:
            my_calculator.addItem(val);
            break;
    }
});
});