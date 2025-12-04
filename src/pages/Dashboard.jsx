import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Statistic,
  Typography,
  Tag,
  message,
  Spin,
  Skeleton,
  Space,
  Button,
} from "antd";
import {
  HomeOutlined,
  StarFilled,
  StarOutlined,
  LoadingOutlined,
  EnvironmentOutlined,
  BorderOutlined,
  ColumnWidthOutlined,
} from "@ant-design/icons";
import {
  StyledContent,
  StyledCard,
  PriceTag,
} from "../styles/pages/Dashboard.styles";
import axios from "axios";
import { useUser } from "../context/UserContext";

const { Title, Text, Paragraph } = Typography;

const Dashboard = () => {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState();

  useEffect(() => {
    const getProperties = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/property/list`
        );
        setProperties(res.data.items);
      } catch (error) {
        message.error("เกิดข้อผิดพลาด กรุณาลองใหม่ภายหลัง");
        console.error("Error fetching properties:", error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    getProperties();
  }, []);

  const toggleFavorite = async (id) => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/user/favorites/${user.id}`,
        { propertyId: id }
      );

      setUser(res.data.user);

      const isFavorite = res.data.user.favorites.includes(id);
      if (isFavorite) {
        message.success("เพิ่มเข้ารายการโปรดแล้ว");
      } else {
        message.success("ลบออกจากรายการโปรดแล้ว");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      const status = error.response.status;
      const errorMessage = error.response.data?.message || "เกิดข้อผิดพลาด";

      if (status === 400) {
        message.error("ข้อมูลไม่ถูกต้อง");
      } else if (status === 404) {
        message.error("ไม่พบผู้ใช้");
      } else if (status === 500) {
        message.error("เซิร์ฟเวอร์ขัดข้อง กรุณาลองใหม่ภายหลัง");
      } else {
        message.error(errorMessage);
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("th-TH").format(price);
  };

  if (loading) {
    return (
      <StyledContent>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
            size="large"
          />
          <Text style={{ color: "#aaa", fontSize: 16 }}>
            Loading properties...
          </Text>
        </div>
      </StyledContent>
    );
  }

  return (
    <StyledContent>
      <Row style={{ width: "100%" }}>
        <Col xs={24} md={16} offset={4}>
          <div style={{ marginBottom: 24 }}>
            <Title level={2} style={{ color: "#ffffff", marginBottom: 8 }}>
              Property Dashboard
            </Title>
            <Text style={{ color: "#aaa" }}>
              Browse and manage your favorite properties
            </Text>
          </div>

          <Row gutter={[16, 16]}>
            {properties.map((property) => (
              <Col xs={24} sm={12} lg={8} key={property.id}>
                <StyledCard
                  cover={
                    <img
                      alt={property.title}
                      src={property.image}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  }
                >
                  <Space
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Title level={4}>{property.title}</Title>
                    <Button
                      type="text"
                      icon={
                        user.favorites.includes(property.id) ? (
                          <StarFilled
                            style={{ color: "#FFD700", fontSize: "20px" }}
                          />
                        ) : (
                          <StarOutlined
                            style={{ color: "#666", fontSize: "20px" }}
                          />
                        )
                      }
                      onClick={() => {
                        toggleFavorite(property.id);
                      }}
                      style={{
                        border: "none",
                        background: "transparent",
                      }}
                    />
                  </Space>
                  <Paragraph
                    ellipsis={{ rows: 2 }}
                    style={{ color: "#aaa", marginBottom: 12 }}
                  >
                    {property.description}
                  </Paragraph>
                  <div style={{ marginBottom: 12 }}>
                    <Text style={{ color: "#aaa" }}>
                      <EnvironmentOutlined style={{ marginRight: 8 }} />
                      {property.location}
                    </Text>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: "12px 0",
                      padding: "12px 0",
                      borderTop: "1px solid #2a2a2a",
                      borderBottom: "1px solid #2a2a2a",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <BorderOutlined
                        style={{ marginRight: 4, color: "#aaa" }}
                      />
                      <Text style={{ color: "#aaa" }}>
                        {property.bedrooms} Beds
                      </Text>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <HomeOutlined style={{ marginRight: 4, color: "#aaa" }} />
                      <Text style={{ color: "#aaa" }}>
                        {property.bathrooms} Baths
                      </Text>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <ColumnWidthOutlined
                        style={{ marginRight: 4, color: "#aaa" }}
                      />
                      <Text style={{ color: "#aaa" }}>
                        {property.area} sq.m
                      </Text>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 12,
                    }}
                  >
                    <Tag color={property.type === "sale" ? "green" : "blue"}>
                      {property.type === "sale" ? "For Sale" : "For Rent"}
                    </Tag>
                    <PriceTag>฿{formatPrice(property.price)}</PriceTag>
                  </div>
                </StyledCard>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </StyledContent>
  );
};

export default Dashboard;
