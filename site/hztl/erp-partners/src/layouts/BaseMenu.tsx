import React from "react";
import { Menu, Icon } from "antd";
import { IRoute } from "umi-types";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

export interface BasicLayoutProps {
  route: IRoute;
  location: Location;
  basePlatShow: boolean;
}

const BaseMenu: React.FC<BasicLayoutProps> = props => {
  const { location: { pathname }, basePlatShow } = props;
  const selectedKeys: string[] = getSelectedMenuKeys(pathname);
  function getSelectedMenuKeys(pathname: string) {
    return [pathname];
  }

  const renderMenu = (routes: IRoute[]) => {
    return routes
      .filter(route => route.name && !route.hide)
      .map(route => {
        if (route.routes) {
          return <SubMenu title={route.name}>{renderMenu(route.routes)}</SubMenu>;
        } else if (route.path) {
          if(route.path.indexOf("platcustomer")!=-1&&!basePlatShow){
            return null
          }else{
            return (
              <Menu.Item key={route.path}>
                {!route.path ? null : (
                  <Link to={route.path}>
                    {!route.icon ? null : <Icon type={route.icon} />}
                    <span>{route.name}</span>
                  </Link>
                )}
              </Menu.Item>
            );
          }
        }
        return null;
      });
  };
  return (
    <Menu theme="light" mode="horizontal" selectedKeys={selectedKeys}>
      {!props.route || !props.route.routes ? null : renderMenu(props.route.routes)}
    </Menu>
  );
};

export default BaseMenu;
