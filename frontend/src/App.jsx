import { Route, Routes } from "react-router-dom";
import { Home, Login, Register } from "./pages";
import { Layout } from "./components";

export default function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}
