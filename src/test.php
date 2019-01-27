<?php
$firstname = $_POST['firstName'];
$lastname = $_POST['lastName'];
$email = $_POST['email'];
$password = $_POST['password'];

if (!empty($firstname) || !empty($lastname) || !empty($email) || !empty($password))
    {
    $host = "localhost";
    $dbUsername = "root";
    $dbPassword = "";
    $dbname = "nutanix";

    // create connection

    $conn = new mysqli($host, $dbUsername, $dbPassword, $dbname);
    if (mysqli_connect_error())
        {
        die('Connect Error(' . mysqli_connect_errno() . ')' . mysqli_connect_error());
        }
      else
        {
        $SELECT = "SELECT email From register Where email = ? Limit 1";
        $INSERT = "INSERT Into register (firstname, lastname, email, password) values(?, ?, ?, ?)";

        // Prepare statement

        $stmt = $conn->prepare($SELECT);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->bind_result($email);
        $stmt->store_result();
        $rnum = $stmt->num_rows;
?>
    <!DOCTYPE html>
    <html lang="en">
       <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <!-- Compiled css goes here -->
          <link rel="stylesheet" href="./css/bootstrap.css">
          <!-- Custom styles goes here -->
          <link rel="stylesheet" href="./css/styles.css">
          <title>Nutanix - Sign Up</title>
       </head>
       <body>
            <div class="body-wrapper">
                <div class="my-container">
   <?php
        if ($rnum == 0)
            {
            $stmt->close();
            $stmt = $conn->prepare($INSERT);
            $stmt->bind_param("ssss", $firstname, $lastname, $email, $password);
            $stmt->execute();
            echo "<h2>New record inserted sucessfully! Thank you $firstname $lastname<h2>";
            }
          else
            {
            echo "<h2>Someone already register using this email<h2>";
            }

        $stmt->close();
        $conn->close();
        }

?>
                </div>
            </div>
        </body>
        <?php
    }
  else
    {
    echo "All field are required";
    die();
    }

?>

