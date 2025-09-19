import express from 'express';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = 3001; // Choose a port for your backend

app.use(express.json()); // Middleware to parse JSON request bodies

// Placeholder for email OTP generation
app.post('/api/auth/email-otp', async (req: Request, res: Response) => {
  const { email } = req.body;
  console.log(`Received request for email OTP for: ${email}`);
  // In a real application, you would generate an OTP, send it to the email,
  // and store it with an expiry.
  // For now, we'll just simulate success.
  res.status(200).json({ message: 'OTP sent successfully (simulated)' });
});

// Placeholder for email OTP verification
app.post('/api/auth/email-otp/verify', async (req: Request, res: Response) => {
  const { email, code } = req.body;
  console.log(`Received request for OTP verification for: ${email} with code: ${code}`);
  // In a real application, you would verify the OTP against the stored one.
  // For now, we'll just simulate success.
  if (code === "123456") { // Simple hardcoded OTP for testing
    res.status(200).json({ message: 'OTP verified successfully (simulated)', token: 'fake-jwt-token' });
  } else {
    res.status(400).json({ message: 'Invalid OTP (simulated)' });
  }
});

// Placeholder for anonymous sign-in
app.post('/api/auth/anonymous', async (req: Request, res: Response) => {
  console.log('Received request for anonymous sign-in');
  // In a real application, you would generate an anonymous user session/token.
  // For now, we'll just simulate success.
  res.status(200).json({ message: 'Signed in as guest (simulated)', token: 'fake-guest-jwt-token' });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Node.js backend is running!');
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
