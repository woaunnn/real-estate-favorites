import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import { LogoutOutlined, HomeOutlined, StarOutlined } from "@ant-design/icons";
import { Button } from "antd";
import {
  StyledLayout,
  StyledHeader,
  HeaderTitle,
  UserInfo,
  WelcomeText,
  UserName,
  LogoutButton,
} from "../styles/layouts/AppLayout.styles";

const AppLayout = ({ children }) => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return children;
  }

  return (
    <StyledLayout>
      <StyledHeader>
        <HeaderTitle level={3} onClick={() => navigate("/dashboard")}>
          <HomeOutlined /> Real Estate Favorites
        </HeaderTitle>
        <UserInfo>
          <Button
            type="text"
            icon={<StarOutlined />}
            onClick={() => navigate("/favorites")}
            style={{
              color: "#aaa",
              border: "1px solid #3a3a3a",
              background: "#2a2a2a",
            }}
          >
            My Favorites
          </Button>
          <WelcomeText>
            Welcome, <UserName>{user.name}</UserName>
          </WelcomeText>
          <LogoutButton
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </LogoutButton>
        </UserInfo>
      </StyledHeader>
      {children}
    </StyledLayout>
  );
};

export default AppLayout;
