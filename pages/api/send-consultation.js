// pages/api/send-consultation.js

// IMPORTANT: This is a basic example. For production, use a dedicated email
// service (SendGrid, Resend, Mailgun, AWS SES) and proper error handling.
// Directly using nodemailer with Gmail might have security/deliverability issues.
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, company, details } = req.body;

  // Basic validation
  if (!name || !email || !details) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Configure Nodemailer (REPLACE with your actual email provider config)
  // Using ethereal.email for testing - generates temporary credentials
  // For Gmail, you might need App Passwords and enable "less secure apps" (not recommended)
  let transporter;
  try {
     // Generate test SMTP service account from ethereal.email
     // Only needed if you don't have a real mail account for testing
     // let testAccount = await nodemailer.createTestAccount();

     transporter = nodemailer.createTransport({
       host: process.env.EMAIL_HOST || 'smtp.ethereal.email', // Use Ethereal for testing or your provider
       port: parseInt(process.env.EMAIL_PORT || '587', 10),
       secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
       auth: {
         // Use environment variables for security
         user: process.env.EMAIL_USER, // || testAccount.user, // Ethereal user
         pass: process.env.EMAIL_PASS, // || testAccount.pass, // Ethereal password
       },
       // If using Gmail locally with issues, you might need:
       // tls: {
       //   rejectUnauthorized: false
       // }
     });

     // Email content
     const mailOptions = {
       from: `"Devasoft Consultation Form" <${process.env.EMAIL_USER || 'noreply@example.com'}>`,
       to: 'info@devasoft.in', // Your target email address
       replyTo: email, // Set reply-to for easy response
       subject: `New Consultation Request from ${name}`,
       text: `
        New Consultation Request:

        Name: ${name}
        Email: ${email}
        Company: ${company || 'N/A'}
        Project Details:
        ${details}
      `,
       html: `
        <h2>New Consultation Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <hr>
        <h3>Project Details:</h3>
        <p>${details.replace(/\n/g, '<br>')}</p>
      `,
     };

     // Send mail
     let info = await transporter.sendMail(mailOptions);

     console.log('Message sent: %s', info.messageId);
     // Preview only available when sending through an Ethereal account
     // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

     return res.status(200).json({ message: 'Consultation request sent successfully!' });

  } catch (error) {
    console.error('Error sending email:', error);
    // Check for specific nodemailer errors if needed
    return res.status(500).json({ message: 'Failed to send consultation request.' });
  }
} 