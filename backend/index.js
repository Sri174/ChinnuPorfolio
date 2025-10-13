import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config(); // Load environment variables from .env file
const app = express();
const port = 3001; // Choose a port for your backend
app.use(express.json()); // Middleware to parse JSON request bodies
// Create transporter for nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like 'outlook', 'yahoo', etc.
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS // Your email password or app password
    }
});
// Placeholder for email OTP generation
app.post('/api/auth/email-otp', async (req, res) => {
    const { email } = req.body;
    console.log(`Received request for email OTP for: ${email}`);
    // In a real application, you would generate an OTP, send it to the email,
    // and store it with an expiry.
    // For now, we'll just simulate success.
    res.status(200).json({ message: 'OTP sent successfully (simulated)' });
});
// Placeholder for email OTP verification
app.post('/api/auth/email-otp/verify', async (req, res) => {
    const { email, code } = req.body;
    console.log(`Received request for OTP verification for: ${email} with code: ${code}`);
    // In a real application, you would verify the OTP against the stored one.
    // For now, we'll just simulate success.
    if (code === "123456") { // Simple hardcoded OTP for testing
        res.status(200).json({ message: 'OTP verified successfully (simulated)', token: 'fake-jwt-token' });
    }
    else {
        res.status(400).json({ message: 'Invalid OTP (simulated)' });
    }
});
// Placeholder for anonymous sign-in
app.post('/api/auth/anonymous', async (req, res) => {
    console.log('Received request for anonymous sign-in');
    // In a real application, you would generate an anonymous user session/token.
    // For now, we'll just simulate success.
    res.status(200).json({ message: 'Signed in as guest (simulated)', token: 'fake-guest-jwt-token' });
});
app.get('/', (req, res) => {
    res.send('Node.js backend is running!');
});
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        console.log(`Received contact form submission from: ${name} <${email}>`);
        // Send email using nodemailer
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender address
            to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER, // Recipient address (or default to sender)
            subject: `Portfolio Contact: Message from ${name}`,
            text: `You have received a new message from your portfolio website.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
        };
        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
        res.status(200).json({ message: 'Contact form submitted successfully and email sent!' });
    }
    catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
});
app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
