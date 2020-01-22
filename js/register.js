window.onload=function(){
  document.getElementById("register").onclick=insertRecord;
  document.getElementById("update").onclick=updateRecord;
  document.getElementById("country").addEventListener("change", function() {
    populate1('country', 'state','city');
  });
  document.getElementById("state").addEventListener("change", function() {
    populate2('state','city');
  });
  document.getElementById('email').onchange=myFunction1;
  document.getElementById("subscribe").onclick=subscribe_message;
  document.getElementById("email").onchange=ValidateEmail;
  document.getElementById("adhar").onchange=adhar_valid;
  document.getElementById("mobile").onchange=mobile_valid;
  document.getElementById('dob').onchange=age_validator;
  
}
arr=['fname','lname','fatherName','motherName','email','mobile','adhar','gender','dob','country','state','city'];
  arr.forEach(function(elem) {
    document.getElementById(elem).addEventListener("change", function() {
        remove_warn(elem);
    });
    document.getElementById("email_subscribe").onchange=remove_error;
});
var flag=false;

/* function for age validation, age should be in between 14-40 */
function age_validator(){
  var dateString = document.getElementById("dob").value;
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
      document.getElementById("dob_error1").style.visibility="hidden";
    }else {
      document.getElementById('dob').style.border = "solid 1px red";
      document.getElementById("dob_error1").style.visibility="visible";
    }
  }
}

function remove_error(){
  if(document.getElementById("email_subscribe").value.trim()!=""){
    document.querySelectorAll("#subscribe_incorrect , #subscribe_correct").style.visibility="hidden";
  }
}

/* SUbscribe messsage */
function subscribe_message(){
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(document.getElementById('email_subscribe').value.match(mailformat)){
    document.getElementById("subscribe_correct").style.visibility="visible";
  }else{
    document.getElementById("subscribe_incorrect").style.visibility="visible";
  }
}
function myFunction1() {
  var x = document.getElementById("email");
  x.value = x.value.toLowerCase();
}
/* validation function for email format. Like- it must contain a '@' symbol*/

function ValidateEmail()
{
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(document.getElementById('email').value.match(mailformat)){
  }else{
    document.getElementById('email').style.border = "solid 1px red";
    document.getElementById("email_error").style.visibility="visible";
  }
}

/* mobile number validation code. It must contain only digit and should length of 10 */
function mobile_valid(){
  var phoneno = /^\d{10}$/;
  if(document.getElementById('mobile').value.match(phoneno)){
  }else{
    document.getElementById('mobile').style.border = "solid 1px red";
    document.getElementById("mobile_error").style.visibility="visible";
  }
}

/* Aadhar number validation code. It must contain only digit and should length of 12 */
function adhar_valid(){
  var adharno = /^\d{12}$/;
  if(document.getElementById('adhar').value.match(adharno)){
  }else{
    document.getElementById('adhar').style.border = "solid 1px red";
    document.getElementById("adhar_error").style.visibility="visible";
  }
}

/* check for email validation for new register
no two same email cant be registered
*/
function duplicateEmail_register(){
  var table=document.getElementById('mytable');
  if(table){
    var email=document.getElementById('email').value;
    for(var i=0; i< table.rows.length;i++){
        if(table.rows[i].cells[8].innerHTML==email){
          document.getElementById('email').style.border = "solid 1px red";
          document.getElementById("email_error").style.visibility="visible";
          return false;
        }
    }
  } 
}
/* check for email validation for edit record
no two same email cant be registered*/

function duplicateEmail_edit(edit_row_index){
  var table=document.getElementById('mytable');
  if(table){
    var email=document.getElementById('email').value;
    for(var i=0; i< table.rows.length;i++){
        if(i==edit_row_index){
          continue;
        }
        else if(table.rows[i].cells[8].innerHTML==email){
          document.getElementById('email').style.border = "solid 1px red";
          document.getElementById("email_error").style.visibility="visible";
          return false;
        }
    }
  } 
}

/* check for adhar validation for new record
no two same email cant be registered*/
function duplicateAdhar_register(){
  var table=document.getElementById('mytable');
  if(table){
    var adhar=document.getElementById('adhar').value;
    for(var i=0; i< table.rows.length;i++){
        if(table.rows[i].cells[6].innerHTML==adhar){
          document.getElementById('adhar').style.border = "solid 1px red";
          document.getElementById("adhar_error").style.visibility="visible";
          return false;
        }
    }
  } 
}
/* check for adhar validation for edit record
no two same email cant be registered*/

function duplicateAdhar_edit(edit_row_index){
  var table=document.getElementById('mytable');
  if(table){
    var adhar=document.getElementById('adhar').value;
    for(var i=0; i< table.rows.length;i++){
        if(i==edit_row_index){
          continue;
        }
        else if(table.rows[i].cells[6].innerHTML==adhar){
          document.getElementById('adhar').style.border = "solid 1px red";
          document.getElementById("adhar_error").style.visibility="visible";
          return false;
        }
    }
  } 
}
/*remove warning msg after valid input */
function remove_warn(id){
  if(document.getElementById(id).value!=""){
    document.getElementById(id).style.border = "solid 1px white";
    document.getElementById(id+"_error").style.visibility="hidden";
  }
}

/*
function for validation of empty data, if any
*/
function emptyData(val){
  if(document.getElementById(val).value.trim()==""){
    return false;
  }
}

/* function for insert new record and show them into table
*/

function insertRecord(){
  arr=['fname','mname','lname','fatherName','motherName','gender','adhar','dob','email','mobile','country','state','city'];
  for(id of arr){ // function call for empty data validation
    if(id=='mname'){
      continue;
    }   
    var vld=emptyData(id);
    if(vld==false){
      document.getElementById(id).style.border = "solid 1px red";
      document.getElementById(id+"_error").style.visibility="visible";
      return false;
    }
  }

  var eval_adhar=duplicateAdhar_register(); // function call for email validation 
  if(eval_adhar==false){
    return false;
  }

  var eval=duplicateEmail_register(); // function call for email validation 
  if(eval==false){
    return false;
  }
  
  var table = document.getElementById("mytable");
  var row = table.insertRow();
  for(var i = 0; i < 13 ; i++){
    row.insertCell(i).innerHTML=document.getElementById(arr[i]).value.trim();
  }
    row.insertCell(13).innerHTML = '<button class="button2" onclick="editRow(this)">Edit Record</button>';
    row.insertCell(14).innerHTML = '<button class="button2" onclick="deletecnfg(this)">Delete Record</button>';

    frm=document.getElementsByName("myForm")[0];
    frm.reset();
  }
 
/*function for delete confirmation message and to delete record */
function deletecnfg(r) {
  var del=confirm("Are you sure you want to do this ?");
  if(del==true){
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("mytable").deleteRow(i);
  }else{

  }
}

/* function for displaying all data in the input field on edit options */
function editRow(row){
  flag=true;
  edit_row_index = row.parentNode.parentNode.rowIndex;
  r = document.getElementById("mytable").rows[edit_row_index];
  for( var i=0; i < 13 ; i++){
    document.getElementById(arr[i]).value=r.cells[i].innerHTML;
  }
  if(flag==true){
    document.getElementById('update').style.visibility="visible";
    document.getElementById('register').style.visibility="hidden";
  }
}
/* functions for update record and store them into table */
function updateRecord(){

  for(id of arr){  
    if(id=='mname'){
      continue;
    }     // function call for empty data validation
    var vld=emptyData(id);
    if(vld==false){
      document.getElementById(id).style.border = "solid 1px red";
      document.getElementById(id+"_error").style.visibility="visible";
      return false;
    }
  }

  var eval_adhr=duplicateAdhar_edit(edit_row_index); // function call for email validation 
  if(eval_adhr==false){
    return false;
  }
  var eval=duplicateEmail_edit(edit_row_index); // function call for email validation 
  if(eval==false){
    return false;
  }
  
  var eval=duplicateEmail_edit(edit_row_index); // function call for email validation 
  if(eval==false){
    return false;
  }
  

  for( var i=0; i< 13 ; i++){
    r.cells[i].innerHTML=document.getElementById(arr[i]).value;
  }
  r.cells[13].innerHTML='<button class="button2" onclick="editRow(this)">Edit Record</button>';
  r.cells[14].innerHTML='<button class="button2" onclick="deletecnfg(this)">Delete Record</button>';
  
  if(flag==true){
    document.getElementById('update').style.visibility="hidden";
    document.getElementById('register').style.visibility="visible";
    flag=false;
  }
  frm.reset();
}
/* function for creating dynamic optons for dependent drop down menu */
function createOptions1(s2,state,s3,city){
  for(option in state){
    var pair=state[option].split("|");
    var newOption = document.createElement("option");
    newOption.value=pair[0];
    newOption.innerHTML=pair[1];
    s2.options.add(newOption);
  }
  createOptions2(s3,city);
}

/* function for creating dynamic optons for dependent drop down menu */
function createOptions2(s2,city){
  for(option in city){
    var pair=city[option].split("|");
    var newOption = document.createElement("option");
    newOption.value=pair[0];
    newOption.innerHTML=pair[1];
    s2.options.add(newOption);
  }
}
/* function for dependent country, state and city list */
function populate1(s1,s2,s3){
  var s1 = document.getElementById(s1);
  var s2 = document.getElementById(s2);
  var s3 = document.getElementById(s3);
  s2.innerHTML="";
  s3.innerHTML="";
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
  var stateArray = countryStateMap[s1.value];
  var cityArray = countryCitiesMap[s1.value];
  createOptions1(s2,stateArray,s3,cityArray);
  
}
/* function for dependent country and state list */
function populate2(s1,s2){
  var s1 = document.getElementById(s1);
  var s2 = document.getElementById(s2);
  s2.innerHTML="";
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
  var cityArray = stateCitiesMap[s1.value];
  createOptions2(s2,cityArray);
}