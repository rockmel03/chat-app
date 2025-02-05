import { Link } from "react-router-dom";
import { RegisterForm } from "../features/auth/RegisterForm";

export const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900  text-gray-300">
      <div className="bg-gray-800 p-6 rounded shadow-md w-96">
        <h2 className="text-2xl text-center font-bold text-white mb-4">
          Create Account
        </h2>
        <RegisterForm />
        <div className="mt-4 text-center">
          <p className="text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
