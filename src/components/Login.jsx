import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => window.location.href = "/dashboard", 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setSuccess("");
    try {
      await signInWithPopup(auth, googleProvider);
      setSuccess("Google Sign-In successful! Redirecting...");
      setTimeout(() => window.location.href = "/dashboard", 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <form onSubmit={handleLogin} className="flex flex-col">
          <input type="email" placeholder="Email" className="p-2 mb-2 border rounded" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="p-2 mb-4 border rounded" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
        </form>
        <button onClick={handleGoogleSignIn} className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600 w-full">
          Sign in with Google
        </button>
        <p className="text-center mt-3">
          Don't have an account? <a href="/register" className="text-blue-500">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
