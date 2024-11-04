const Mailjet = require('node-mailjet');
const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRET_KEY
);

const sendEmail = async (toEmail, subject, text) => {
  try {
    const request = await mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: process.env.Email,
              Name: "Your App Name"
            },
            To: [
              {
                Email:toEmail ,
                Name: "Recipient Name"
              }
            ],
            Subject: subject,
            TextPart: text
          }
        ]
      });
      console.log( {
        from:process.env.Email,
        to:toEmail
    });
    
    console.log("Email sent:", request.body);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
