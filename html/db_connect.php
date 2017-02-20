<?php
/**
	* Conecting to the database
	*
	* @param author Digitalis
*/

function connect(){
    $con = mysqli_connect("146.185.150.217", "root2", "test123", "metsense");

    if (mysqli_connect_errno()){
        echo "Failed". mysqli_connect_error();
    }

    mysqli_set_charset($con, "utf-8");
    return $con;
}

?>
