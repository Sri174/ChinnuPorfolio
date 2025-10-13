// Simple test to verify the backend email functionality
const testData = {
  name: "Test User",
  email: "test@example.com",
  message: "This is a test message from the portfolio contact form."
};

// Test the backend API directly
fetch('http://localhost:3001/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testData)
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});
