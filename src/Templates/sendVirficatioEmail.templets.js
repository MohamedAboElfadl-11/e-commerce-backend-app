const emailTemplate = (firstName, otp, condition) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${condition} - Click Shop</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 400px;
            margin: 40px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 5px;
            text-align: center;
            box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
            border: 1px solid #ddd;
        }
        h2 {
            color: #333;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 12px;
        }
        p {
            color: #444;
            font-size: 14px;
            line-height: 1.5;
            margin-bottom: 15px;
        }
        .otp-box {
            font-size: 20px;
            font-weight: bold;
            color: #333;
            padding: 8px;
            border: 1px solid #ccc;
            display: inline-block;
            letter-spacing: 3px;
            border-radius: 3px;
            background: #f7f7f7;
        }
        .note {
            font-size: 12px;
            color: #777;
            margin-top: 10px;
        }
        .footer {
            font-size: 11px;
            color: #999;
            margin-top: 15px;
            border-top: 1px solid #ddd;
            padding-top: 8px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <h2>${condition}</h2>
        <p>Hello <strong>${firstName}</strong>,</p>
        <p>Use the OTP below to <strong>${condition}</strong>:</p>
        <div class="otp-box">${otp}</div>
        <p class="note">This OTP is valid for <strong>10 minutes</strong>. Do not share it with anyone.</p>
        <p class="footer">If you did not request this, please ignore this email.</p>
    </div>
</body>
</html>
`;

export default emailTemplate;
