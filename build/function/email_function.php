<?php
//variables for email
$to         = 'anders.bjork@metsense.com';
$subject    = 'Metsense client';
$email      = $_POST['email'];
$cname      = $_POST['cname'];
$fname      = $_POST['fname'];
$lname      = $_POST['lname'];
$country    = $_POST['country'];
$number     = $_POST['number'];
$info       = $_POST['info'];


$cart_ids = $_SESSION['cart_ids'];
$cart_num = $_SESSION['cart_num'];

$order = "";
foreach($cart_ids as $i=>$id){
    $product = get_product_by_id($con, $id);
    $products[] = $product;
    $name = $product['name'];
    $order .= $name . " x" . $cart_num[$i] . "\n"; 
}

//email function
$message = <<<EMAIL
Name:                   \n <b>$fname . " " . $lname</b> \n
Email:                  \n <b>$email</b> \n
Company:                \n <b>$cname</b> \n
Country:                \n <b>$country</b> \n
Phone number:           \n <b>$number</b> \n
Additional information: \n <b>$info</b> \n
Order:                  \n <b>$order</b> \n

EMAIL;
echo $message;
$header = "From: $email";

//validation
if($_POST){
    if($email == '' || $cname == '' || $fname == '' || $lname == '' || $country == ''){
        $feedback = 'Please fill out all the fields';
        header("Location: finish_order.php?feedback=$feedback&email=$email&cname=$cname&fname=$fname&lname=$lname&country=$country&info=$info");
    }
    //email calidator
    else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $feedback = "Invalid email format";
        header("Location: finish_order.php?feedback=$feedback&email=$email&cname=$cname&fname=$fname&lname=$lname&country=$country&info=$info");
    }
    else{
        mail($to, $subject, $message, $header);
        /*$feedback = 'Thanks for making an order to Digitalis, we will get back to you as soon as possible';*/
    }
}
?>