<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Database configuration
$host = 'localhost';
$dbname = 'portfolio_db';
$username = 'root';
$password = '';

// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Create response array
$response = ['success' => false, 'message' => ''];

try {
    // Create PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    
} catch(PDOException $e) {
    error_log("Database connection failed: " . $e->getMessage());
    $response['message'] = 'Database connection failed. Please try again later.';
    echo json_encode($response);
    exit;
}

// Check if form is submitted via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get and sanitize form data
    $name = trim(filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_LOW));
    $email = trim(filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL));
    $subject = trim(filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_LOW));
    $message = trim(filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_LOW));
    
    // Validate form data
    $errors = [];
    
    // Name validation
    if (empty($name)) {
        $errors[] = 'Name is required.';
    } elseif (strlen($name) < 2) {
        $errors[] = 'Name must be at least 2 characters long.';
    } elseif (strlen($name) > 100) {
        $errors[] = 'Name must not exceed 100 characters.';
    }
    
    // Email validation
    if (empty($email)) {
        $errors[] = 'Email is required.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Please enter a valid email address.';
    } elseif (strlen($email) > 150) {
        $errors[] = 'Email must not exceed 150 characters.';
    }
    
    // Subject validation
    if (empty($subject)) {
        $errors[] = 'Subject is required.';
    } elseif (strlen($subject) > 200) {
        $errors[] = 'Subject must not exceed 200 characters.';
    }
    
    // Message validation
    if (empty($message)) {
        $errors[] = 'Message is required.';
    } elseif (strlen($message) < 10) {
        $errors[] = 'Message must be at least 10 characters long.';
    }
    
    // If no errors, process the form
    if (empty($errors)) {
        try {
            // Prepare SQL statement
            $stmt = $pdo->prepare("INSERT INTO contacts (name, email, subject, message) VALUES (:name, :email, :subject, :message)");
            
            // Bind parameters
            $stmt->bindParam(':name', $name, PDO::PARAM_STR);
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $stmt->bindParam(':subject', $subject, PDO::PARAM_STR);
            $stmt->bindParam(':message', $message, PDO::PARAM_STR);
            
            // Execute the statement
            if ($stmt->execute()) {
                $response['success'] = true;
                $response['message'] = 'Thank you for your message! I will get back to you soon.';
                
                // Send email notification
                $emailSent = sendEmailNotification($name, $email, $subject, $message);
                
                if (!$emailSent) {
                    // Log but don't show error to user - the message is still saved in database
                    error_log("Email notification failed for contact from: $email");
                }
                
            } else {
                $response['message'] = 'Failed to save your message. Please try again.';
            }
            
        } catch(PDOException $e) {
            error_log("Database error: " . $e->getMessage());
            $response['message'] = 'An error occurred while saving your message. Please try again.';
        }
    } else {
        $response['message'] = implode('<br>', $errors);
    }
} else {
    $response['message'] = 'Invalid request method.';
}
// Return JSON response
echo json_encode($response);

function sendEmailNotification($name, $email, $subject, $message) {
    $to = "high.dee.dev@gmail.com";
    $email_subject = "Portfolio Contact: " . $subject;
    
    // Sanitize input for email
    $sanitized_name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $sanitized_subject = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');
    $sanitized_message = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));
    
    $email_body = "
    <!DOCTYPE html>
    <html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>New Contact Form Submission</title>
        <style>
            body { 
                font-family: 'Arial', sans-serif; 
                line-height: 1.6; 
                color: #333; 
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container { 
                max-width: 600px; 
                margin: 0 auto; 
                background: #ffffff;
            }
            .header { 
                background: #0A2463; 
                color: white; 
                padding: 30px 20px; 
                text-align: center; 
            }
            .header h2 {
                margin: 0;
                font-size: 24px;
            }
            .content { 
                padding: 30px; 
            }
            .field { 
                margin-bottom: 20px; 
                padding-bottom: 15px;
                border-bottom: 1px solid #eee;
            }
            .field:last-child {
                border-bottom: none;
            }
            .label { 
                font-weight: bold; 
                color: #0A2463; 
                display: block;
                margin-bottom: 5px;
                font-size: 16px;
            }
            .value {
                color: #555;
                font-size: 15px;
            }
            .message-content {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 5px;
                border-left: 4px solid #0A2463;
            }
            .footer {
                background: #f8f9fa;
                padding: 20px;
                text-align: center;
                color: #666;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>🚀 New Portfolio Contact</h2>
            </div>
            <div class='content'>
                <div class='field'>
                    <span class='label'>👤 Name:</span>
                    <span class='value'>$sanitized_name</span>
                </div>
                <div class='field'>
                    <span class='label'>📧 Email:</span>
                    <span class='value'>$email</span>
                </div>
                <div class='field'>
                    <span class='label'>📋 Subject:</span>
                    <span class='value'>$sanitized_subject</span>
                </div>
                <div class='field'>
                    <span class='label'>💬 Message:</span>
                    <div class='message-content'>$sanitized_message</div>
                </div>
            </div>
            <div class='footer'>
                <p>This email was sent from your portfolio contact form at " . date('Y-m-d H:i:s') . "</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Proper email headers
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: Portfolio Website <noreply@highdeedev.com>', // Use a fixed domain email
        'Reply-To: ' . $email, // User's email for reply
        'X-Mailer: PHP/' . phpversion(),
        'X-Priority: 1', // High priority
        'Return-Path: high.dee.dev@gmail.com'
    ];
    
    // Additional headers for better deliverability
    $additional_headers = [
        'Organization: High Dee Dev',
        'Content-Transfer-Encoding: 8bit',
        'Date: ' . date('r')
    ];
    
    $headers = array_merge($headers, $additional_headers);
    
    try {
        // Send email and check if it was successful
        $mail_sent = mail($to, $email_subject, $email_body, implode("\r\n", $headers));
        
        // Log the attempt (useful for debugging)
        error_log("Email sending attempt: " . ($mail_sent ? 'SUCCESS' : 'FAILED') . 
                 " | To: $to | From: $email | Subject: $subject");
        
        return $mail_sent;
        
    } catch (Exception $e) {
        error_log("Email sending error: " . $e->getMessage());
        return false;
    }
}
?>