import React, { useState } from "react";
import {
  UserOutlined,
  CarOutlined,
  ShopOutlined,
  ScheduleOutlined,
  CustomerServiceOutlined
} from "@ant-design/icons";
import {  Layout, Menu } from 'antd';
import { ConfigProvider, BackTop } from "antd";
import {  useNavigate, Link } from "react-router-dom";
import "../index.css";
import "../App.css";
import Navbar from "./Navbar";
import { api } from "../services/api";


const { Data } = api;
const { Header, Content, Footer, Sider } = Layout;

const style = {
  lineHeight: "100%",
  backgroundColor: "cyan",
  color: "white",
  fontSize: "20px",
  fontWeight: "bold",
  textAlign: "center"
};

ConfigProvider.config({
  theme: {
    // primaryColor: "#1DA57A"
    primaryColor: "#bluebird"
  }
});
// type MenuItem = Required<MenuProps>['items'][number];

function getItem(label, key, icon, onClick) {
  return {
    key,
    icon,
    onClick,
    label
  };
}

const LayoutPage = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  const items: MenuItem[] = [
    getItem("Usuario", "1", <UserOutlined />, () => {
      navigate("/main/mi-perfil");
    }),
    getItem("Vehiculos", "2", <CarOutlined />, () => {
      navigate("/main/vehiculos");
    }),
    getItem("Servicios", "3", <ShopOutlined />, () => {
      navigate("/main/servicios");
    }),
    getItem("Ordenes", "4", <ScheduleOutlined />, () => {
        navigate("/main/mis-ordenes");
    }),
    getItem("Atencion al Cliente", "7", <CustomerServiceOutlined />, () => {
      navigate("/main/atencion-al-cliente");
    })
  ];

  return (
    <Layout
      style={{
        minHeight: "95vh"
      }}
    >
      {Data && (
        <Header className="header">
          <Navbar />
        </Header>
      )}
      <Sider
        className="sider"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
      <Layout
        className="site-layout-background"
        style={{
          padding: "24px 0"
        }}
      >
        <div>
          <Content
            style={{
              padding: "0 24px",
              minHeight: "95vh"
            }}
          >
            <div
              className="site-layout-background"
              style={{
                padding: "0 24px",
                minHeight: 280
              }}
            >
               {props.children}
            </div>
            <BackTop>
              <div style={style}>↑</div>
            </BackTop>
          </Content>
        </div>
      </Layout>
      <Footer className="footer">
        <p>
          Todos los derechos reservados ©2022 Created by Emmanuel Solis Ruiz
        </p>
      </Footer>
    </Layout>
  );
};

export default LayoutPage;
