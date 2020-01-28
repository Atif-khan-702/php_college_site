<?php

$con = mysqli_connect('localhost', 'root', 'nitrr2020mca');
mysqli_select_db($con, 'nit_student');

$email=$_POST['email_login'];
$pass=$_POST['pass_login'];

    $sql = "SELECT * FROM st WHERE Email='$email' and Adhar='$pass'" ;

    $result = mysqli_query( $con, $sql ) ;

    if( mysqli_num_rows( $result1 ) > 0 )
    {
        echo "you are successfuly login" ;
    }else{
        echo "oops.. something went wrong" ;
    }
    
    


?>