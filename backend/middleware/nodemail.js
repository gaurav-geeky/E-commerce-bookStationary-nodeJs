const nodemailer = require("nodemailer"); 
require("dotenv").config(); 

const userNodeMail = (uname, uemail, upass) => {

    // Create transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "gauravnegi.geeky@gmail.com",
            pass: process.env.PASS_KEY,
        },
    });

    // Email options
    const mailOptions = {
        from: "gauravnegi.geeky@gmail.com",
        to: uemail,
        subject: "Mailing through Nodemailer",
        text: `Hello, Dear ${uname}, \n We are from BookHunt your password is ${upass}, \n you can login through Email and Password Both. `,
        // html: "<b>Hello!</b> This is a <i>test</i> email."
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent successfully:", info.response);
        }
    });
}

module.exports = {
    userNodeMail, 
}