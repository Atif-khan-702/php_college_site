<?php

$con = mysqli_connect('localhost', 'root', 'nitrr2020mca');
mysqli_select_db($con, 'student');

$fname=$_POST['fname'];
$mname=$_POST['mname'];
$lname=$_POST['lname'];
$fatherName=$_POST['fatherName'];
$motherName=$_POST['motherName'];
$gender=$_POST['gender'];
$dob=$_POST['dob'];
$adhar=$_POST['adhar'];
$email=$_POST['email'];
$mobile=$_POST['mobile'];
$country=$_POST['country'];
$state=$_POST['state'];
$city=$_POST['city'];
    
$sql="INSERT INTO newsletter_email VALUES ('$fname', '$mname', '$lname', '$fatherName', '$motherName', '$gender', '$adhar', '$dob', '$email', '$mobile', '$country', '$state', '$city')";

$result=mysql_query($sql);
if($result){
    echo "You have been successfully registered.";
}
?>