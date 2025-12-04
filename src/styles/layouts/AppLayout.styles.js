import styled from 'styled-components';
import { Layout, Button, Typography } from 'antd';

const { Header } = Layout;
const { Title, Text } = Typography;

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background: #0a0a0a;
`;

export const StyledHeader = styled(Header)`
  background: #1a1a1a;
  border-bottom: 1px solid #2a2a2a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  height: 70px;
`;

export const HeaderTitle = styled(Title)`
  margin: 0 !important;
  color: #ffffff !important;
  font-size: 24px !important;
  cursor: pointer;
  font-weight: 600;
  
  &:hover {
    color: #f0f0f0 !important;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const WelcomeText = styled(Text)`
  color: #aaa;
  font-size: 14px;
`;

export const UserName = styled.span`
  color: #ffffff;
  font-weight: 600;
`;

export const LogoutButton = styled(Button)`
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  color: #fff;
  
  &:hover {
    background: #3a3a3a !important;
    border-color: #4a4a4a !important;
    color: #fff !important;
    transform: translateY(-1px);
  }
`;
