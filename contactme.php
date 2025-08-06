<?php   
    require("./mailing/mailfunction.php");

    $name = $_POST["name"];
    $phone = $_POST['phone'];
    $email = $_POST["email"];
    $message = $_POST["message"];
    

    //$body = "<ul><li>Name: ".$name."</li><li>Phone: ".$phone."</li><li>Email: ".$email."</li><li>Message: ".$message."</li></ul>";
    $body = "<div style=\"font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4; padding: 20px;\">
  <div style=\"background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); padding: 25px; max-width: 600px; margin: auto;\">
    <h1 style=\"color: #4a4a4a; font-size: 24px; margin-bottom: 20px; text-align: center;\">Lead Basic Details</h1>
    <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"border-collapse: collapse; color: #555;\">
      <tr style=\"border-bottom: 1px solid #eaeaeb;\">
        <td style=\"padding: 12px 0; font-weight: bold; width: 30%;\">Name:</td>
        <td style=\"padding: 12px 0;\">".$name."</td>
      </tr>
      <tr style=\"border-bottom: 1px solid #eaeaeb;\">
        <td style=\"padding: 12px 0; font-weight: bold;\">Phone:</td>
        <td style=\"padding: 12px 0;\">".$phone."</td>
      </tr>
      <tr style=\"border-bottom: 1px solid #eaeaeb;\">
        <td style=\"padding: 12px 0; font-weight: bold;\">Email:</td>
        <td style=\"padding: 12px 0;\">".$email."</td>
      </tr>
      <tr>
        <td style=\"padding: 12px 0; font-weight: bold; vertical-align: top;\">Message:</td>
        <td style=\"padding: 12px 0;\">".$message."</td>
      </tr>
    </table>
  </div>
</div>";
    $status = mailfunction($email, "Company", $body); //reciever

    if($status)
        echo '<center><h1>Thanks! We will contact you soon.</h1></center>';
    else
        echo '<center><h1>Error sending message! Please try again.</h1></center>';    
?>