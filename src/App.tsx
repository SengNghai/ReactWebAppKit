import {
  Button,
  Card,
  FloatingBubble,
  JumboTabs,
  List,
  NavBar,
  NoticeBar,
  Rate,
  Space,
  Swiper,
  Switch,
  WaterMark,
  ConfigProvider,
} from "antd-mobile";
// import enUS from 'antd-mobile/es/locales/en-US'
import zhCN from 'antd-mobile/es/locales/zh-CN'
import { MessageFill } from "antd-mobile-icons";
import { useLayoutEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router";
import googleLogo from "./assets/google.svg";
import config from "./configs";


import { useNavigate } from "react-router";
import MyPwaApps from "./pwa/components/MyPwaApps";
import useClearCache from "./hooks/useClearCache.ts";

import CalendarPickered from "./components/CalendarPickered";

import styles from './App.module.less';

const colors = [
  "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1xigWT.img?w=800&h=435&q=60&m=2&f=jpg",
  "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1xijmK.img?w=800&h=435&q=60&m=2&f=jpg",
  "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1xigX6.img?w=800&h=435&q=60&m=2&f=jpg",
  "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1qjCg6.img?w=800&h=435&q=60&m=2&f=jpg",
];

const content = {
  height: 300,
  color: "#ffffff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 48,
  userSelect: "none",
};

const items = colors.map((color, index) => (
  <Swiper.Item key={index}>
    <div
      style={{
        backgroundImage: `url(${color})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...content,
        userSelect: "none" as const,
      }}
    />
  </Swiper.Item>
));

const textProps = {
  content: "google Mobile",
};

const rowsTextProps = {
  content: ["google Mobile", "google Mobile Pro"],
};

const imageProps = {
  image: googleLogo,
  imageWidth: 115,
  imageHeight: 36,
  width: 140,
  height: 80,
};

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const routes = config.routes;
  const [props, setProps] = useState<{ [key: string]: any }>(textProps);

  const [enableDarkMode, setEnableDarkMode] = useState(true);

  // 清除缓存
  const clearCache = useClearCache();

  useLayoutEffect(() => {
    document.documentElement.setAttribute(
      "data-prefers-color-scheme",
      enableDarkMode ? "dark" : "light"
    );
  }, [enableDarkMode]);

  // render routes
  const renderRoutes = () => {
    // new routes
    return routes.map((route, routeIndex) => {
      return route.routes ? (
        <Route
          key={`route-${route.path}-${routeIndex}`}
          path={route.path}
          element={<route.element />}
        >
          {route.routes.map((children, childrenIndex) => {
            return children.routes ? (
              <Route
                key={`children-${children.path}-${childrenIndex}`}
                path={children.path}
                element={<children.element />}
              >
                {children.routes.map((child, childIndex) => {
                  return (
                    <Route
                      key={`child-${child.path}-${childIndex}`}
                      index={child.index}
                      path={`${children.path}${child.path}`}
                      element={<child.element />}
                    />
                  );
                })}
              </Route>
            ) : (
              <Route
                key={`children-${children.path}-${childrenIndex}`}
                index={children.index}
                path={children.path}
                element={<children.element />}
              />
            );
          })}
        </Route>
      ) : (
        <Route
          key={`route-${route.path}-${routeIndex}`}
          index={route.index}
          path={route.path}
          element={<route.element />}
        />
      );
    });
  };

  // navs
  const Navs = () => {
    return (
      <List>
        {routes.map((route, routeIndex) => {
          return route.routes ? (
            <List.Item key={`route-${route.path}-${routeIndex}`}>
              <List header={route.title}>
                {route.routes.map((children, childrenIndex) => {
                  return children.routes ? (
                    <List.Item
                      key={`children-${children.path}-${childrenIndex}`}
                    >
                      <List header={children.title}>
                        {children.routes.map((child, childIndex) => {
                          return (
                            <List.Item
                              key={`child-${child.path}-${childIndex}`}
                            >
                              <Link to={`${children.path}${child.path}`}>
                                {child.title}
                              </Link>
                            </List.Item>
                          );
                        })}
                      </List>
                    </List.Item>
                  ) : (
                    <List.Item
                      key={`children-${children.path}-${childrenIndex}`}
                    >
                      <Link to={children.path}>{children.title}</Link>
                    </List.Item>
                  );
                })}
              </List>
            </List.Item>
          ) : route.path !== "*" ? (
            <List.Item key={`route-${route.path}-${routeIndex}`}>
              <Link to={route.path}>{route.title}</Link>
            </List.Item>
          ) : null;
        })}
      </List>
    );
  };

  const handleFloatingBubble = (_e: React.MouseEvent<HTMLDivElement>) => {
    navigate("/im");
  };

  const handleOnBack = () => {
    if (location.pathname.includes("/im")) {
      if (location.pathname === "/im/message") {
        navigate(-1);
      } else {
        navigate("/");
      }
    } else {
      navigate(-1);
    }
  };

  // /im/message
  return (
    <>
      <ConfigProvider locale={zhCN}>
        {location.pathname.includes("/im") ? (
          location.pathname !== "/im/message" ? (
            <NavBar
              back={location.pathname === "/im/message" ? "Back" : "Home"}
              onBack={handleOnBack}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: "100vw",
                zIndex: 1000,
                background: 'var(--adm-color-background)',
                borderBottom: 'solid 1px var(--adm-color-border)'
              }}
            >
              title
            </NavBar>
          ) : null
        ) : (
          <>
            <NoticeBar
              content="consequat eu pariatur mollit enim et eu deserunt nostrud officia ipsum irure eu non sint elit Lorem id aliquip non"
              color="alert"
            />
            <Swiper autoplay={true} loop={true}>
              {items}
            </Swiper>
            <Card title="Dark Mode">
              <Space align="center">
                <div>Dark Mode</div>
                <Switch
                  checked={enableDarkMode}
                  onChange={(v) => {
                    setEnableDarkMode(v);
                  }}
                />
              </Space>
            </Card>
            <Card title="CalendarPicker 日历选择器">
              <CalendarPickered />
            </Card>
            <Card title="水印">
              <div className="water-mark-overlay">
                <Space wrap>
                  <Button color="primary" onClick={() => setProps(textProps)}>
                    普通水印
                  </Button>
                  <Button color="success" onClick={() => setProps(rowsTextProps)}>
                    多行文字水印
                  </Button>
                  <Button color="danger" onClick={() => setProps(imageProps)}>
                    图片水印
                  </Button>
                </Space>
                <WaterMark {...props} />
              </div>
            </Card>
            <Card title="JumboTabs">
              <JumboTabs defaultActiveKey="insects">
                <JumboTabs.Tab title="水果" description="描述文案" key="fruits" />
                <JumboTabs.Tab
                  title="蔬菜"
                  description="描述文案"
                  key="vegetables"
                />
                <JumboTabs.Tab
                  title="昆虫"
                  description="描述文案"
                  key="insects"
                />
                <JumboTabs.Tab
                  title="花卉"
                  description="描述文案"
                  key="flowers"
                />
                <JumboTabs.Tab title="鸟类" description="描述文案" key="birds" />
                <JumboTabs.Tab title="人类" description="描述文案" key="human" />
                <JumboTabs.Tab
                  title="水果"
                  description="描述文案"
                  key="fruits1"
                />
                <JumboTabs.Tab
                  title="蔬菜"
                  description="描述文案"
                  key="vegetables2"
                />
                <JumboTabs.Tab
                  title="昆虫"
                  description="描述文案"
                  key="insects3"
                />
                <JumboTabs.Tab
                  title="花卉"
                  description="描述文案"
                  key="flowers4"
                />
                <JumboTabs.Tab title="鸟类" description="描述文案" key="birds5" />
                <JumboTabs.Tab title="人类" description="描述文案" key="human6" />
              </JumboTabs>
            </Card>
            <Card title="导航">
              <Navs />
            </Card>
            <Card title="评分">
              <Rate allowHalf defaultValue={2.5} />
            </Card>

            <Card title="PWA">
              <MyPwaApps />
            </Card>
            <Card title="清除缓存数据">
              <Button color="primary" onClick={clearCache}>清除所有缓存</Button>
            </Card>
            
          </>
        )}

        {!location.pathname.includes("/im") ? (
          <FloatingBubble
            axis="xy"
            magnetic="x"
            onClick={handleFloatingBubble}
            style={{
              "--initial-position-bottom": "180px",
              "--initial-position-right": "24px",
              "--edge-distance": "24px",
            }}
          >
            <MessageFill fontSize={32} />
          </FloatingBubble>
        ) : null}
        <main className={styles.App}>
          <Routes>{renderRoutes()}</Routes>
        </main>
      </ConfigProvider>
    </>
  );
}

export default App;
