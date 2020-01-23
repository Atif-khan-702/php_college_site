$(document).ready(function(){
    $.getJSON("JSON/student.json", function(data){
        var student_data = '';
        $.each(data, function(key, value){
            student_data += '<tr>';
            student_data += '<td>'+value.fname+'</td>';
            student_data += '<td>'+value.mname+'</td>';
            student_data += '<td>'+value.lname+'</td>';
            student_data += '<td>'+value.fatherName+'</td>';
            student_data += '<td>'+value.motherName+'</td>';
            student_data += '<td>'+value.gender+'</td>';
            student_data += '<td>'+value.adhar+'</td>';
            student_data += '<td>'+value.dob+'</td>';
            student_data += '<td>'+value.email+'</td>';
            student_data += '<td>'+value.mobile+'</td>';
            student_data += '<td>'+value.country+'</td>';
            student_data += '<td>'+value.state+'</td>';
            student_data += '<td>'+value.city+'</td>';
            student_data += '<td><button class="button2" onclick="editRow(this)" id="edit">Edit Record</button></td>';
            student_data += '<td><button class="button2" onclick="deletecnfg(this)" id="delete">Delete Record</button></td>';
            student_data += '</tr>';
        });
        $('#mytable').append(student_data);
    });
    var formModule = (function(){
        var flag=false;
        /* function for age validation, age should be in between 14-40 */
        function age_validator(){
            var dateString = $("#dob").val();
            if(dateString !=""){
                var today = new Date();
                var birthDate = new Date(dateString);
                var age = today.getFullYear() - birthDate.getFullYear();
                var m = today.getMonth() - birthDate.getMonth();
                var da = today.getDate() - birthDate.getDate();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                if(m<0){
                    m +=12;
                }
                if(da<0){
                    da +=30;
                }
                if (age >= 16 && age <= 40) {
                    $("#dob_error1").css("visibility","hidden");
                }else {
                    $('#dob').css("border" , "solid 1px red");
                    $("#dob_error1").css("visibility","visible");
                    return false;
                }
            }
        };

        /* function for remove warning in subscription area */
        function remove_error(){
            if($("#email_subscribe").val().trim()!=""){
              $("#subscribe_correct").css("visibility" , "hidden");
              $("#subscribe_incorrect").css("visibility" , "hidden");
            }
        };

        /* SUbscribe messsage */
        function subscribe_message(){
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if($('#email_subscribe').val().match(mailformat)){
            $("#subscribe_correct").css("visibility" , "visible");
            $('form[name ="subs_form"]')[0].reset();
            }else{
            $("#subscribe_incorrect").css("visibility" , "visible");
            }
        };

        /*function to change email in lowerCase onchange  */
        function myFunction1() {
            var email=$('#email').val();
            if(email!=""){
                $("#email").val($('#email').val().toLowerCase());
            }
            
        };

         /* validation function for email format. Like- it must contain a '@' symbol*/
  
        function ValidateEmail()
        {
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if($('#email').val().match(mailformat)){
            }else{
                $('#email').css("border" , "solid 1px red");
                $("#email_error").css("visibility" ,"visible");
            return false;
            }
        };

         /* mobile number validation code. It must contain only digit and should length of 10 */
        function mobile_valid(){
            var phoneno = /^\d{10}$/;
            if($('#mobile').val().match(phoneno)){
            }else{
                $('#mobile').css("border" , "solid 1px red");
                $("#mobile_error").css("visibility", "visible");
                return false;
            }
        };

        /* Aadhar number validation code. It must contain only digit and should length of 12 */
        function adhar_valid(){
            var adharno = /^\d{12}$/;
            if($('#adhar').val().match(adharno)){
            }else{
                $('#adhar').css("border" , "solid 1px red");
                $("#adhar_error").css("visibility" , "visible");
                return false;
            }
        };


        /* check for email validation for new register
    no two same email cant be registered
    */
    function duplicateEmail_register(){
        var flag1=true;
        $('#mytable tbody tr').each(function () {
            $projectName = $(this).find('td:eq(8)').text();
            if ($projectName == $('#email').val()) {
                flag1=false;
            }
        })
        if(flag1==false){
            $('#email').css("border" , "solid 1px red");
            $("#email_error").css("visibility" , "visible");
            return false;
        }
    };

    /* check for email validation for edit record
    no two same email cant be registered*/

    function duplicateEmail_edit(){
        var flag3=true;
        var count=0;
        $('#mytable tbody tr').each(function () {
            $projectName = $(this).find('td:eq(8)').text();
            if ($projectName == $('#email').val()) {
                count=count+1;
                if(count>1){
                    flag3=false;
                }
            }
        })
        if(flag3==false){
            $('#email').css("border" , "solid 1px red");
            $("#email_error").css("visibility" , "visible");
            return false;
        }

    };

    /* check for adhar validation for new record
    no two same email cant be registered*/
    function duplicateAdhar_register(){
        var flag2=true;
        $('#mytable tbody tr').each(function () {
            $projectName = $(this).find('td:eq(6)').text();
            if ($projectName == $('#adhar').val().trim()) {
                flag2= false;
            }
        })
        if(flag2==false){
            $('#adhar').css("border" , "solid 1px red");
            $("#adhar_error").css("visibility" , "visible");
            return false;
        }
    };

    /* check for adhar validation for edit record
    no two same email cant be registered*/
    
    function duplicateAdhar_edit(){
        var flag4=true;
        var count=0;
        $('#mytable tbody tr').each(function () {
            $projectName = $(this).find('td:eq(6)').text();
            if ($projectName == $('#adhar').val().trim()) {
                count=count+1;
                if(count>1){
                    flag4= false;
                }
            }
        })
        if(flag4==false){
            $('#adhar').css("border" , "solid 1px red");
            $("#adhar_error").css("visibility" , "visible");
            return false;
        }
    };

     /*remove warning msg after valid input */
    function remove_warn(id){
        if($('#'+id).val()!=""){
            $('#'+id).css("border" , "solid 1px white");
            $('#'+id+"_error").css("visibility","hidden");
        }
    };

            /*
        function for validation of empty data, if any
        */
        function emptyData(val){
            if($('#'+id).val().trim()==""){
                return false;
            }
        };

        /* function for inserting new record in the table*/
        function insertRecord(){
            arr=['fname','mname','lname','fatherName','motherName','gender','adhar','dob','email','mobile','country','state','city'];
            for(id of arr){ // function call for empty data validation
              if(id=='mname'){
                continue;
              }   
              var vld=emptyData(id);
              if(vld==false){
                $('#'+id).css("border" , "solid 1px red");
                $('#'+id+"_error").css("visibility","visible");
                return false;
              }
            }
          
            var adhar_value=adhar_valid();
            if(adhar_value==false){
              return false;
            }
          
            var email_value=ValidateEmail();
            if(email_value==false){
              return false;
            }
          
            var age_value=age_validator();
            if(age_value==false){
              return false;
            }
          
            var mobile_value=mobile_valid();
            if(mobile_value==false){
              return false;
            }
          
            var eval_adhar=duplicateAdhar_register(); // function call for email validation 
            if(eval_adhar==false){
                return false;
            }
          
            var eval=duplicateEmail_register(); // function call for email validation 
            if(eval==false){
                return false;
            }
            
            var table = $("#mytable")[0];
            var row = table.insertRow();
            for(var i = 0; i < 13 ; i++){
                $(row.insertCell(i)).text($('#'+arr[i]).val().trim());
            }
            $(row.insertCell(13)).html('<button class="button2" onclick="editRow(this)" id="edit">Edit Record</button>');
            $(row.insertCell(14)).html('<button class="button2" onclick="deletecnfg(this)" id="delete">Delete Record</button>');

            $('#myForm')[0].reset();
        };

         /*function for delete confirmation message and to delete record */
        function deletecnfg(r) {
            var del=confirm("Are you sure you want to do this ?");
            if(del==true){
                var i = $(this).parent().index('tr');
                $("tr").eq(i).remove();
            }
        };

        /* function for displaying all data in the input field on edit options */
        function editRow(row){
            flag=true;
            edit_row_index = row.closest("tr").index();
            var rowData = row.closest("tr");
            console.log(rowData);
            for( var i=0; i < 13 ; i++){
                $('#'+arr[i]).val(rowData.find('td').eq(i).text());
            }
            if(flag==true){
                $('#update').css("visibility","visible");
                $('#register').css("visibility","hidden");
            }
        };

        /* functions for update record and store them into table */
        function updateRecord(){
        
            for(id of arr){  
            if(id=='mname'){
                continue;
            }     // function call for empty data validation
            var vld=emptyData(id);
            if(vld==false){
                $('#'+id).css("border" , "solid 1px red");
                $('#'+id+"_error").css("visibility","visible");
                return false;
            }
            }
        
            var adhar_value=adhar_valid();
            if(adhar_value==false){
                return false;
            }
        
            var email_value=ValidateEmail();
            if(email_value==false){
                return false;
            }
        
            var age_value=age_validator();
            if(age_value==false){
                return false;
            }
        
            var mobile_value=mobile_valid();
            if(mobile_value==false){
                return false;
            }
            
            var eval_adhr=duplicateAdhar_edit(); // function call for email validation 
            if(eval_adhr==false){
                return false;
            }
            var eval=duplicateEmail_edit(); // function call for email validation 
            if(eval==false){
                return false;
            }

            for( var i=0; i< 13 ; i++){
                $('#mytable tr').eq(edit_row_index).find('td').eq(i).text($('#'+arr[i]).val().trim());
            }
            $('#mytable tr').eq(edit_row_index).find('td').eq(13).html('<button class="button2" onclick="editRow(this)" id="edit">Edit Record</button>');
            $('#mytable tr').eq(edit_row_index).find('td').eq(14).html('<button class="button2" onclick="deletecnfg(this)" id="delete">Delete Record</button>');
            
            if(flag==true){
                $('#update').css("visibility","hidden");
                $('#register').css("visibility","visible");
                flag=false;
            }
        
            $('#myForm')[0].reset();
        };

         /* function for creating dynamic optons for dependent drop down menu */
        function createOptions1(state1,city1){
            for(option in state1){
                var pair=state1[option].split("|");
                $('#state').append($('<option>').val(pair[0]).html(pair[1]));
            }
            createOptions2(city1);
        };

        /* function for creating dynamic optons for dependent drop down menu */
        function createOptions2(city1){
            for(option in city1){
                var pair=city1[option].split("|");
                $('#city').append($('<option>').val(pair[0]).html(pair[1]));
            }
        };

        function populate1(){
            var s1 = $('#country');
            $('#state').text("");
            $('#city').text("");
            let countryStateMap = {
                'India': ["|select","Jharkhand|Jharkhand","Bihar|BIhar","Uttar pardesh|Uttar pardesh"],
                'Australia' : ["|select","Victoria|Victoria","Queensland|Queensland"],
                'America' : ["|select","Alaska|Alaska","California|California","New York|New York"]
              };
            
              let countryCitiesMap = {
                'India' : ["|select","Gaya|Gaya","Patna|Patna","Nalanda|Nalanda","Ranchi|Ranchi","Tatanagar|Tatanagar","Dhanwad|Dhanwad","Banaras|Banaras","Lucknow|Lucknow","Agra|Agra"],
                'Australia' : ["|select","Hamilton|Hamilton","Kerang|Kerang","Swan Hill|Swan Hill","Brisbane|Brisbane","Gladstone|Gladstone","Emerald|Emerald"],
                'America' : ["|select","Anchorage|Anchorage","Fairbanks|Fairbanks","Vacaville|Vacaville","Sacramento|Sacramento","Abbott Road|Abbott Road","Abell Corners|Abell Corners"]
              };
              var stateArray = countryStateMap[s1.val()];
              var cityArray = countryCitiesMap[s1.val()];
            createOptions1(stateArray,cityArray);
    };

    function populate2(){
            var s1 = $('#state');
            $('#city').text("");
            let stateCitiesMap = {
                'Bihar' : ["|select","Gaya|Gaya","Patna|Patna","Nalanda|Nalanda"],
                'Jharkhand' :  ["|select","Ranchi|Ranchi","Tatanagar|Tatanagar","Dhanwad|Dhanwad"],
                'Uttar pardesh' : ["|select","Banaras|Banaras","Lucknow|Lucknow","Agra|Agra"],
                'Victoria' : ["|select","Hamilton|Hamilton","Kerang|Kerang","Swan Hill|Swan Hill"],
                'Queensland' : ["|select","Brisbane|Brisbane","Gladstone|Gladstone","Emerald|Emerald"],
                'Alaska' : ["|select","Anchorage|Anchorage","Fairbanks|Fairbanks"],
                'California' : ["|select","Vacaville|Vacaville","Sacramento|Sacramento"],
                'New York' : ["|select","Abbott Road|Abbott Road","Abell Corners|Abell Corners"]
            };

            var cityArray = stateCitiesMap[s1.val()];        
            createOptions2(cityArray);
    };

    return{
        age_validator:age_validator,
        remove_error:remove_error,
        adhar_valid:adhar_valid,
        mobile_valid:mobile_valid,
        subscribe_message:subscribe_message,
        ValidateEmail:ValidateEmail,
        insertRecord:insertRecord,
        updateRecord:updateRecord,
        populate1:populate1,
        populate2:populate2,
        myFunction1:myFunction1,
        remove_warn:remove_warn,
        editRow:editRow,
        deletecnfg:deletecnfg,
        duplicateAdhar_register:duplicateAdhar_register,
        duplicateEmail_register:duplicateEmail_register
      };
}());
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

    $(document).on('click',"#delete", function(){
        formModule.deletecnfg(this)
    });

    $(document).on('click',"#edit", function(){
        formModule.editRow($(this))
    });

    $(document).on('change','#email',function(){
        formModule.duplicateEmail_register()
    })

    $(document).on('change','#adhar',function(){
        formModule.duplicateAdhar_register()
    })
    
})