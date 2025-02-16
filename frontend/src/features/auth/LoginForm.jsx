import { useState } from "react";
import { InputFeild } from "./InputFeild";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthServices } from "../../api/useAuthServices";
import { useAuth } from "../../context/AuthContext";

const initialFormData = {
  user: "",
  password: "",
};

export const LoginForm = () => {
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

  const { loginUser } = useAuthServices();
  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseData = await loginUser(formData);
      setAuth({ token: responseData.data?.accessToken, ...responseData?.data });

      setFormData(initialFormData);
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      {error && <p className="text-red-500 font-medium text-center">{error}</p>}
      <InputFeild
        title="Email or Username is required"
        type="text"
        placeholder="Enter email or username"
        name="user"
        value={formData.user}
        onChange={inputHandler}
        autoFocus="on"
        required
      />
      <div className="relative">
        <InputFeild
          title="Password is required"
          type={showPwd ? "text" : "password"}
          placeholder="Enter password here"
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
        Login
      </button>
    </form>
  );
};
