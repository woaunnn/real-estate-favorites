import styled from 'styled-components';
import { Button } from 'antd';

export const AuthContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0a0a0a;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const AuthCard = styled.div`
  background: #1a1a1a;
  padding: 40px;
  border-radius: 12px;
  border: 1px solid #2a2a2a;
  width: 100%;
  max-width: 450px;
  animation: slideUp 0.5s ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const AuthTitle = styled.h1`
  margin: 0 0 10px 0;
  color: #ffffff;
  font-size: 28px;
  text-align: center;
  font-weight: 600;
`;

export const AuthSubtitle = styled.p`
  color: #aaa;
  text-align: center;
  margin: 0 0 30px 0;
  font-size: 14px;
`;

export const ModeToggleWrapper = styled.div`
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
`;

export const InputGroup = styled.div`
  margin-bottom: 20px;
`;

export const InputLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #ccc;
  font-weight: 500;
  font-size: 14px;
`;

export const ErrorText = styled.div`
  color: #ff4d4f;
  font-size: 13px;
  margin-top: 6px;
  min-height: 18px;
`;

export const StyledButton = styled(Button)`
  width: 100%;
  height: 45px;
  font-size: 16px;
  font-weight: 600;
  background: #ffffff;
  color: #000;
  border: none;
  
  &:hover {
    background: #f0f0f0 !important;
    color: #000 !important;
    transform: translateY(-2px);
  }
`;
