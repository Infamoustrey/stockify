<?php

session_start();

session_destroy();
unset($_SESSION['userID']);
unset($_SESSION['loggedIn']);

echo 'Logged Out Successfully';