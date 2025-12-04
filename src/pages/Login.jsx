import { useEffect, useState } from "react";
import { Select, Input, Segmented, message } from "antd";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import {
  AuthContainer,
  AuthCard,
  AuthTitle,
  AuthSubtitle,
  ModeToggleWrapper,
  InputGroup,
  InputLabel,
  ErrorText,
  StyledButton,
} from "../styles/components/Login.styles";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const [selectedUserId, setSelectedUserId] = useState("");
  const [newUser, setNewUser] = useState("");
  const [authMode, setAuthMode] = useState("select");
  const [error, setError] = useState("");
  const [userOptions, setUserOptions] = useState();

  const getUserData = async (id) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/${id}`);

      if (res.status === 200 && res.data.user) {
        return res.data.user;
      }
      return null;
    } catch (error) {
      console.error(`[Tawan] LOG: error ---> `, error);
      const status = error.response.status;
      const errorMessage = error.response.data?.message || "เกิดข้อผิดพลาด";

      if (status === 404) {
        setError("ไม่พบผู้ใช้นี้");
      } else if (status === 500) {
        message.error("เซิร์ฟเวอร์ขัดข้อง กรุณาลองใหม่ภายหลัง");
      } else {
        message.error(errorMessage);
      }

      return null;
    }
  };

  const createUser = async (name) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/create`,
        { name }
      );

      message.success("สร้างผู้ใช้สำเร็จ");
      return res.data.user;
    } catch (error) {
      console.error(`[Tawan] LOG: error ---> `, error);

      const status = error.response.status;
      const errorMessage = error.response.data?.message || "เกิดข้อผิดพลาด";

      if (status === 400) {
        setError("กรุณากรอกชื่อผู้ใช้");
      } else if (status === 409) {
        setError("ชื่อผู้ใช้นี้มีอยู่แล้ว");
      } else if (status === 500) {
        message.error("เซิร์ฟเวอร์ขัดข้อง กรุณาลองใหม่ภายหลัง");
      } else {
        message.error(errorMessage);
      }

      return null;
    }
  };

  const handleLogin = async () => {
    let user;
    if (authMode === "select") {
      if (!selectedUserId) {
        setError("Please select a user");
        return;
      }

      user = await getUserData(selectedUserId);
    } else {
      if (!newUser.trim()) {
        setError("Please enter a username");
        return;
      }
      user = await createUser(newUser.trim());
    }

    if (user) {
      setError("");
      login(user);
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/list`
        );

        if (response.status === 200 && response.data.users) {
          if (
            Array.isArray(response.data.users) &&
            response.data.users.length > 0
          ) {
            const options = response.data.users.map((user) => ({
              label: user.name,
              value: user.id,
            }));
            setUserOptions(options);
          } else {
            setUserOptions([]);
          }
        }
      } catch (error) {
        console.error(`[Tawan] LOG: error ---> `, error);

        if (error.response) {
          const status = error.response.status;
          const errorMessage = error.response.data?.message || "เกิดข้อผิดพลาด";

          if (status === 500) {
            message.error("เซิร์ฟเวอร์ขัดข้อง กรุณาลองใหม่ภายหลัง");
          } else if (status === 404) {
            message.error("ไม่พบข้อมูลผู้ใช้");
          } else {
            message.error(errorMessage);
          }
        } else if (error.request) {
          message.error("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
        } else {
          message.error("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้");
        }

        setUserOptions([]);
      }
    };
    getUsers();
  }, []);

  return (
    <AuthContainer>
      <AuthCard>
        <AuthTitle>
          <HomeOutlined /> Real Estate Favorites
        </AuthTitle>
        <AuthSubtitle>Please identify yourself to continue</AuthSubtitle>

        <ModeToggleWrapper>
          <Segmented
            options={[
              { label: "Select User", value: "select" },
              { label: "Enter Username", value: "create" },
            ]}
            value={authMode}
            onChange={setAuthMode}
          />
        </ModeToggleWrapper>

        {authMode === "select" ? (
          <InputGroup>
            <InputLabel>Choose a user:</InputLabel>
            {userOptions && Array.isArray(userOptions) && (
              <Select
                size="large"
                placeholder="-- Select User --"
                value={selectedUserId || undefined}
                onChange={setSelectedUserId}
                style={{ width: "100%" }}
                options={userOptions}
                status={error && authMode === "select" ? "error" : ""}
              />
            )}
            <ErrorText>{error && authMode === "select" ? error : ""}</ErrorText>
          </InputGroup>
        ) : (
          <InputGroup>
            <InputLabel>Enter your username:</InputLabel>
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Enter username..."
              value={newUser}
              onChange={(e) => setNewUser(e.target.value)}
              onPressEnter={handleLogin}
              status={error && authMode === "create" ? "error" : ""}
            />
            <ErrorText>{error && authMode === "create" ? error : ""}</ErrorText>
          </InputGroup>
        )}

        <StyledButton type="primary" size="large" onClick={handleLogin}>
          Login
        </StyledButton>
      </AuthCard>
    </AuthContainer>
  );
};

export default Login;
