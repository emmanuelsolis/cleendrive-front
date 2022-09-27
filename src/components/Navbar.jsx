import { Menu } from "antd";
import '../App.css';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  CarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ user, handleLogout }) => (

  <Menu mode="horizontal" defaultSelectedKeys={["mail"]} className='navbar'>
    {!user && (
      <>
        <Menu.Item key="login" icon={<MailOutlined />}>
          <Link to="/login">Iniciar Sesion</Link>
        </Menu.Item>
        <Menu.Item key="signup" icon={<AppstoreOutlined />}>
          / <Link to="/signup">Registrate</Link>
        </Menu.Item>
      </>
    )}
    {/* Debe ser dinamico le vamos a decir que aparezca o desaparezca dependiendo el estado */}
    {/*  user ? resultado1 : resultado2 */}
    {/* user && solo elemento a mostrar */}
    {user && (
      <>
       { (user.role === "Client") && 
        <>
       (<Menu.Item key="registerCar" icon={<CarOutlined />}>
          <Link to="/register-car">Registrar automóvil</Link>
        </Menu.Item>
        <Menu.Item key="vehiculos" icon={<CarOutlined />}>
          <Link to="/main/vehiculos">Mis Coches Registrados</Link>
        </Menu.Item>)
       
        <Menu.SubMenu
          key="cleanservices"
          title="Nuestros Servicios"
          icon={<SettingOutlined />}
        >
          <Menu.Item key="Lavado a Domicilio">
            Lavado a Domicilio
          </Menu.Item>
          <Menu.Item key="Recoger para Lavado">
            Recoger para Lavado
          </Menu.Item>
          <Menu.Item key="Lavado de Interiores">
            Lavado de Interiores
          </Menu.Item>
          <Menu.Item key="Pulido y Encerado">
            Pulido y Encerado
          </Menu.Item>
        </Menu.SubMenu>
        </>
       }
        <Menu.SubMenu key="user" title="Usuario" icon={<UserOutlined />}>
          <Menu.Item key="two" icon={<AppstoreOutlined />}>
            Navigation Two
          </Menu.Item>
          <Menu.Item key="three" icon={<AppstoreOutlined />}>
            Navigation Three
          </Menu.Item>
          <Menu.ItemGroup title="Item Group">
            <Menu.Item key="four" icon={<AppstoreOutlined />}>
              Navigation Four
            </Menu.Item>
            <Menu.Item
              onClick={handleLogout}
              key="five"
              icon={<AppstoreOutlined />}
            >
              cerrar sesion
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
      </>
    )}
  </Menu>
);

export default Navbar;
