import { useState } from "react";
import { InputFeild } from "./InputFeild";
import { useLocation, useNavigate } from "react-router-dom";

const initialFormData = {
  username: "",
  email: "",
  password: "",
};

export const RegisterForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.path || "/";

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData(initialFormData);
    navigate(from, { replace: true });
  };
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      {error && <p className="text-red-500 font-medium text-center">{error}</p>}
      <InputFeild
        title={[
          "Choose a unique username between 3–20 characters.",
          "You can use letters, numbers, underscores, and dots.",
          "Avoid using spaces or special characters like @, #, $, etc.",
        ].join("\n")}
        type="text"
        placeholder="Username"
        name="username"
        value={formData.username}
        onChange={inputHandler}
        autoFocus="on"
        required
      />
      <InputFeild
        title={[
          "Enter a valid email address, e.g., user@example.com.",
          "Make sure this email is accessible for verification purposes.",
          "Avoid using temporary or disposable email addresses.",
        ].join("\n")}
        type="email"
        placeholder="Email Address"
        name="email"
        value={formData.email}
        onChange={inputHandler}
        required
      />
      <div className="relative">
        <InputFeild
          title={[
            "Create a password with at least 8 characters.",
            "Include at least one uppercase letter, one lowercase letter, one number, and one special character (!, @, #, etc.).",
            "Avoid using easily guessed words like 'password' or '123456'.",
          ].join("\n")}
          type={showPwd ? "text" : "password"}
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={inputHandler}
          required
        />
        {formData.password?.length > 0 && (
          <div
            onClick={() => setShowPwd((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-base"
          >
            {showPwd ? (
              <i className="ri-eye-off-line"></i>
            ) : (
              <i className="ri-eye-line"></i>
            )}
          </div>
        )}
      </div>
      {/* <div className="mb-4">
        <TogglePersist label={"Remember me"} />
      </div> */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700"
      >
        Register
      </button>
    </form>
  );
};
