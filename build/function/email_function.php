<?php
//variables for email
$to         = 'info@digitalis.se';
$subject    = 'Digitalis client';
$name       = $_POST['name'];
$email      = $_POST['email'];


//email function
$message = <<<EMAIL
Name:  \n <b>$name</b> \n
Email:  \n <b>$email</b> \n

EMAIL;
$header = "From: $email";

//validation
if($_POST){
    if($name == '' || $email == ''){
        $feedback = 'Please fill out all the fields';
        header("Location: contact.php?feedback=$feedback");
    }
    //name validator
    if (!preg_match("/^[a-zA-Z ]*$/",$name)) {
        $feedback = "Only letters and white space allowed";
    }
    //email calidator
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $feedback = "Invalid email format";
    }
    else{
        mail($to, $subject, $message, $header);
        $feedback = 'Thanks for making an order to Digitalis, we will get back to you as soon as possible';
        header("Location: contact.php?feedback=$feedback");
    }
}
?>