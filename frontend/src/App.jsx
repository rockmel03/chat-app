import { Route, Routes } from "react-router-dom";
import { Home, Login, Register } from "./pages";
import { Layout } from "./components";
import { RequireAuth } from "./features/auth/RequireAuth";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route index element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
}
