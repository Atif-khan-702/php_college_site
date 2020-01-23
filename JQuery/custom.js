$(document).on("click","#register",function(){
    formModule.insertRecord()
});
$(document).on("click","#update",function(){
    formModule.updateRecord()
});
document.getElementById("country").addEventListener("change", function() {
    formModule.populate1();
});

$(document).on("change", '#state', function(){
    formModule.populate2()
});
$(document).on('change','#email',function(){
    formModule.myFunction1()
});

arr=['fname','mname','lname','fatherName','motherName','gender','adhar','dob','email','mobile','country','state','city'];
    arr.forEach(function(elem) {
        $('#'+elem).change(function() {
            formModule.remove_warn(elem)
        });
});
$(document).on('change','#dob',function(){
    formModule.age_validator()
});
$(document).on('change',"#email_subscribe",function(){
    formModule.remove_error()
});

$(document).on('change','#adhar', function(){
    formModule.adhar_valid()
});

$(document).on('change','#mobile', function(){
    formModule.mobile_valid()
});

$(document).on('change','#email', function(){
    formModule.ValidateEmail()
});

$(document).on('click',"#subscribe", function(){
    formModule.subscribe_message()
});
