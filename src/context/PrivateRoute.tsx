import { useAuth } from "./AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

// ログインしていない場合には試合結果入力ページにアクセスできないようにするためのルート保護
const PrivateRoute = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
