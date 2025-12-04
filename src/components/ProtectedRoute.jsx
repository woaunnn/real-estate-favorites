import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useEffect, useRef } from "react";
import { message } from "antd";

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  const hasShownMessage = useRef(false);

  useEffect(() => {
    if (!user && !hasShownMessage.current) {
      message.info("กรุณาเข้าสู่ระบบ");
      hasShownMessage.current = true;
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
