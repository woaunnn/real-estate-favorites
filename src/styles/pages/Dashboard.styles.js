import styled from 'styled-components';
import { Layout, Card, Row, Button } from 'antd';

const { Content } = Layout;

export const StyledContent = styled(Content)`
  background: #0a0a0a;
  padding: 24px;
  min-height: 100vh;
  width: 100%;

  h1, h2, h3, h4, h5, h6 {
    color: #ffffff !important;
    margin: 0 !important;
  }
`;

export const PageHeader = styled.div`
  margin-bottom: 24px;
  
  .ant-typography {
    color: #aaa !important;
  }
`;

export const StyledCard = styled(Card)`
  height: 100%;
  transition: all 0.3s ease;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  
  &:hover {
    transform: translateY(-4px);
    border-color: #3a3a3a;
  }

  .ant-card-cover {
    height: 220px;
    overflow: hidden;
    
    img {
      height: 100%;
      object-fit: cover;
    }
  }
  
  .ant-card-body {
    background: #1a1a1a;
  }
  
  .ant-typography {
    color: #aaa !important;
  }
`;

export const PriceTag = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  margin: 8px 0;
`;

export const PropertyInfo = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 12px;
  flex-wrap: wrap;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #aaa;
  font-size: 14px;
`;

export const FavoriteButton = styled(Button)`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
  background: rgba(26, 26, 26, 0.9);
  border: 1px solid #3a3a3a;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: scale(1.1);
    background: rgba(42, 42, 42, 0.9) !important;
    border-color: #4a4a4a !important;
  }
`;
