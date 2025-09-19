import { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:3001/api/auth"; // Your Node.js backend URL

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ token: string } | null>(null);

  useEffect(() => {
    // Check for existing token in localStorage or sessionStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      // In a real app, you'd verify this token with your backend
      setIsAuthenticated(true);
      setUser({ token });
    }
    setIsLoading(false);
  }, []);

  const signIn = async (type: "email-otp" | "anonymous", data?: FormData) => {
    setIsLoading(true);
    try {
      if (type === "email-otp") {
        const email = data?.get("email") as string;
        const code = data?.get("code") as string;

        if (email && !code) {
          // Step 1: Request OTP
          await axios.post(`${BACKEND_URL}/email-otp`, { email });
          // Frontend will handle setting step to OTP verification
        } else if (email && code) {
          // Step 2: Verify OTP
          const response = await axios.post(`${BACKEND_URL}/email-otp/verify`, { email, code });
          const { token } = response.data;
          localStorage.setItem("authToken", token);
          setIsAuthenticated(true);
          setUser({ token });
        }
      } else if (type === "anonymous") {
        const response = await axios.post(`${BACKEND_URL}/anonymous`);
        const { token } = response.data;
        localStorage.setItem("authToken", token);
        setIsAuthenticated(true);
        setUser({ token });
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      setIsAuthenticated(false);
      setUser(null);
      throw error; // Re-throw to be caught by the component
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      localStorage.removeItem("authToken");
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Sign-out error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isAuthenticated, user, signIn, signOut };
}
