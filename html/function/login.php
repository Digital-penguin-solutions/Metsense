<?php
include "functions.php";

$con = connect();
session_start();
//$password = secure_str($_GET['password']);
if (isset($_POST['set_password']) && isset($_SESSION['admin'])){
    $password        = secure_str($_POST['password']);
    $password_repeat = secure_str($_POST['password_repeat']);
    if ($password === $password_repeat){

        $password = password_hash($password, PASSWORD_BCRYPT, array(
            'cost' => 14
        ));



        mysqli_query($con, "UPDATE constant set data='$password' WHERE name='password'") or die (mysqli_error($con));
        header("Location: ../admin.php?message=Password has been updated");
    }
    else {
        header("Location: ../admin.php?change_password=&message=Passwords do not match");
    }
}
else if (isset($_POST['login'])){
    $select_pass = mysqli_query($con, "SELECT * FROM constant WHERE name = 'password' ");
    $data_pass   = mysqli_fetch_array($select_pass);
    $admin_pass  = $data_pass['data'];

    $password = $_POST['password'];

    if(password_verify($password, $admin_pass)) { // Check if the passwords match

        $_SESSION['admin'] = "true";
        header("Location: ../admin.php");
    }
    else {
        header("Location: ../admin.php?wrong=");
        // wrong password
    }
}
?>
