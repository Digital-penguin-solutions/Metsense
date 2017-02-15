<?php
    include "functions.php";

    $con = connect();
    session_start();
    //$password = secure_str($_GET['password']);
    if (isset($_POST['set_password']) && isset($_SESSION['admin'])){
        $password = secure_str("123");

        $password = password_hash($password, PASSWORD_BCRYPT, array(
            'cost' => 14
            ));

        echo $password;

       mysqli_query($con, "UPDATE constant set data='$password' WHERE name='password'") or die (mysqli_error($con));
    }
    else if (isset($_POST['login'])){
        echo "login";
        $select_pass = mysqli_query($con, "SELECT * FROM constant WHERE name = 'password' "); 
        $data_pass = mysqli_fetch_array($select_pass);
        $admin_pass = $data_pass['data'];
            
        $password = $_POST['password'];

        if(password_verify($password, $admin_pass)) { // Check if the passwords match
             
            $_SESSION['admin'] = "true";
            header("Location: admin.php");
        }
        else {
            header("Location: admin.php");
            // wrong password
        }
    }
?>
