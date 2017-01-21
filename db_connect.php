<?php
/**
	* Coneckting the the database
	* 
	* Conecting to the database
	*
	* @param author Digitalis
*/

function connect(){
    //$con = mysqli_connect("treelineweb.com", "fcclftva_user", "daggmask", "fcclftva_f");
    $con = mysqli_connect("146.185.150.217", "test", "daggmask1", "metsense");

    if (mysqli_connect_errno()){
        echo "Failed". mysqli_connect_error();
    }

    mysqli_set_charset($con, "utf-8");
    return $con;
}

?>
