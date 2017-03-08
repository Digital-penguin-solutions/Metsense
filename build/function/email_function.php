<?php
//variables for email
$to         = 'anders.bjork@metsense.com';
$subject    = 'Metsense client';
$email      = $_POST['email'];
$cname      = $_POST['cname'];
$fname      = $_POST['fname'];
$lname      = $_POST['lname'];
$country    = $_POST['country'];
$info       = $_POST['info'];


//email function
$message = <<<EMAIL
Name:                   \n <b>$cname . $lname</b> \n
Email:                  \n <b>$email</b> \n
Company:                \n <b>$cname</b> \n
Country:                \n <b>$country</b> \n
Addisional information: \n <b>$info</b> \n

EMAIL;
$header = "From: $email";

//validation
if($_POST){
    if($email == '' || $cname == '' || $fname == '' || $lname == '' || $country == '' || $info == ''){
        $feedback = 'Please fill out all the fields';
        header("Location: contact.php?feedback=$feedback");
    }
    //name validator
    if (!preg_match("/^[a-zA-Z ]*$/",$fname)) {
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