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
  
}
arr=['fname','lname','fatherName','motherName','email','mobile','adhar','gender','dob','country','state','city'];
  arr.forEach(function(elem) {
    document.getElementById(elem).addEventListener("change", function() {
        remove_warn(elem);
    });
    document.getElementById("email_subscribe").onchange=remove_error;
});
var flag=false;

function remove_error(){
  if(document.getElementById("email_subscribe").value.trim()!=""){
    document.getElementById("subscribe_incorrect").style.visibility="hidden";
    document.getElementById("subscribe_correct").style.visibility="hidden";
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
    return true;
  }
  return false;
}

/* mobile number validation code. It must contain only digit and should length of 10 */
function mobile_valid(){
  var phoneno = /^\d{10}$/;
  if(document.getElementById('mobile').value.match(phoneno)){
      return true;
  }
     return false;
}

/* Aadhar number validation code. It must contain only digit and should length of 12 */
function adhar_valid(){
  var adharno = /^\d{12}$/;
  if(document.getElementById('adhar').value.match(adharno)){
      return true;
  }
     return false;
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
  var eval=duplicateEmail_register(); // function call for email validation 
  if(eval==false){
    return false;
  }
  var eval_adhar=duplicateAdhar_register(); // function call for email validation 
  if(eval_adhar==false){
    return false;
  }
  var e_valid=ValidateEmail();
  if(e_valid==false){
    document.getElementById('email').style.border = "solid 1px red";
    document.getElementById("email_error").style.visibility="visible";
    return false;
  }
  var mob_valid=mobile_valid();
  if(mob_valid==false){
    document.getElementById('mobile').style.border = "solid 1px red";
    document.getElementById("mobile_error").style.visibility="visible";
    return false;
  }
  var adhr_valid=adhar_valid();
  if(adhr_valid==false){
    document.getElementById('adhar').style.border = "solid 1px red";
    document.getElementById("adhar_error").style.visibility="visible";
    return false;
  }
  
  var table = document.getElementById("mytable");
  var row = table.insertRow();
  for(var i = 0; i < 13 ; i++){
    row.insertCell(i).innerHTML=document.getElementById(arr[i]).value.trim();
  }
    row.insertCell(13).innerHTML = '<button class="button2" onclick="editRow(this)">Edit Record</button>';
    row.insertCell(14).innerHTML = '<button class="button2" onclick="deletecnfg(this)">Delete Record</button>';

    document.getElementById("myForm")[0].reset();

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

  var eval=duplicateEmail_edit(edit_row_index); // function call for email validation 
  if(eval==false){
    return false;
  }
  var eval_adhr=duplicateAdhar_edit(edit_row_index); // function call for email validation 
  if(eval_adhr==false){
    return false;
  }
  if(ValidateEmail()==false){
    document.getElementById('email').style.border = "solid 1px red";
    document.getElementById("email_error").style.visibility="visible";
    return false;
  }
  var mob_valid=mobile_valid();
  if(mob_valid==false){
    document.getElementById('mobile').style.border = "solid 1px red";
    document.getElementById("mobile_error").style.visibility="visible";
    return false;
  }
  var adhr_valid=adhar_valid();
  if(adhr_valid==false){
    document.getElementById('adhar').style.border = "solid 1px red";
    document.getElementById("adhar_error").style.visibility="visible";
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
  document.getElementById("myForm")[0].reset();
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
  if(s1.value=='India'){
    var stateArray = ["|select","Jharkhand|Jharkhand","Bihar|BIhar","Uttar pardesh|Uttar pardesh"];
    var cityArray= ["|select","Gaya|Gaya","Patna|Patna","Nalanda|Nalanda","Ranchi|Ranchi","Tatanagar|Tatanagar","Dhanwad|Dhanwad","Banaras|Banaras","Lucknow|Lucknow","Agra|Agra"];
  }else if(s1.value=='Australia'){
    var stateArray = ["|select","Victoria|Victoria","Queensland|Queensland"];
    var cityArray = ["|select","Hamilton|Hamilton","Kerang|Kerang","Swan Hill|Swan Hill","Brisbane|Brisbane","Gladstone|Gladstone","Emerald|Emerald"];
  }else if(s1.value=='America'){
    var stateArray = ["|select","Alaska|Alaska","California|California","New York|New York"];
    var cityArray= ["|select","Anchorage|Anchorage","Fairbanks|Fairbanks","Vacaville|Vacaville","Sacramento|Sacramento","Abbott Road|Abbott Road","Abell Corners|Abell Corners"];
  }
  createOptions1(s2,stateArray,s3,cityArray);
  
}
/* function for dependent country and state list */
function populate2(s1,s2){
  var s1 = document.getElementById(s1);
  var s2 = document.getElementById(s2);
  s2.innerHTML="";
  if(s1.value=='Bihar'){
    var cityArray = ["|select","Gaya|Gaya","Patna|Patna","Nalanda|Nalanda"];
  }else if(s1.value=='Jharkhand'){
    var cityArray = ["|select","Ranchi|Ranchi","Tatanagar|Tatanagar","Dhanwad|Dhanwad"];
  }else if(s1.value=='Uttar pardesh'){
    var cityArray = ["|select","Banaras|Banaras","Lucknow|Lucknow","Agra|Agra"];
  }else if(s1.value=='Victoria'){
    var cityArray = ["|select","Hamilton|Hamilton","Kerang|Kerang","Swan Hill|Swan Hill"];
  }else if(s1.value=='Queensland'){
    var cityArray = ["|select","Brisbane|Brisbane","Gladstone|Gladstone","Emerald|Emerald"];
  }else if(s1.value=='Alaska'){
    var cityArray = ["|select","Anchorage|Anchorage","Fairbanks|Fairbanks"];
  }else if(s1.value=='California'){
    var cityArray = ["|select","Vacaville|Vacaville","Sacramento|Sacramento"];
  }else if(s1.value=='New York'){
    var cityArray = ["|select","Abbott Road|Abbott Road","Abell Corners|Abell Corners"];
  }

  createOptions2(s2,cityArray);
}