import { Route, Routes } from "react-router-dom";
import { Home, Login, Register } from "./pages";
import { Layout } from "./components";
import { RequireAuth } from "./features/auth/RequireAuth";
import { PersistLogin } from "./features/auth/PersistLogin";
import { Chat } from "./features/chat";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />}>
              <Route path="chat/:chatId" element={<Chat />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
