import { LoginForm } from "../features/auth/LoginForm";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900  text-gray-300">
      <div className="bg-gray-800 p-6 rounded shadow-md w-96">
        <h2 className="text-2xl text-center font-bold text-white mb-4">
          User Login
        </h2>
        <LoginForm />
        <div className="mt-4 text-center">
          <p className="text-gray-300">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
