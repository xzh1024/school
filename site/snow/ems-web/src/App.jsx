import { StoresProvider } from '@/store/index';
import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs';
import { LoadingOutlined } from '@ant-design/icons';
import Index from '@r/index';
import { getParamsByUrl, setTokenByUrl } from '@u/tools';
import { ConfigProvider, Modal, Spin, Typography, message, notification, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import Setting from './pages/dashboard/setting';
import useStores from './store';
const { Text } = Typography;

// 设置包裹
const ConfigProviderWrapper = observer(({ children }) => {
  const { globalStore, configStore } = useStores();
  const { primaryColor, isDarkTheme, borderRadius, borderRadiusLG, borderRadiusSM } = configStore;

  useEffect(() => {
    globalStore.urlParams = getParamsByUrl() || {};
    if (!window.toggleGlobalLoading) {
      window.toggleGlobalLoading = toggleGlobalLoading;
    }
  }, []);

  const toggleGlobalLoading = () => {
    globalStore.loading = !globalStore.loading;
  };

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          screenXXL: 1800,
          screenXXLMin: 1800,
          colorPrimary: primaryColor,
          borderRadius,
          borderRadiusLG,
          borderRadiusSM,
        },
        components: {
          Menu: {
            itemBorderRadius: borderRadius,
            subMenuItemBorderRadius: borderRadius,
          },
          Modal: {
            borderRadiusLG,
            borderRadiusSM,
          },
        },
      }}
    >
      {children}
      <Setting />
    </ConfigProvider>
  );
});

function App() {
  const [api, contextHolder] = notification.useNotification();
  const [modal, modalContextHolder] = Modal.useModal();
  const [messageApi, messageContent] = message.useMessage();
  const checkChromeVersion = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const match = userAgent.match(/Chrome/);
    const version = match[1] || 0;

    return parseFloat(version) > 88;
  };

  const isCompatible = () => {
    var userAgent = window.navigator.userAgent;

    var isOpera = userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1; //判断是否Opera浏览器

    var isQQ = userAgent.indexOf('QQBrowser') > -1; //判断是否QQBrowser浏览器

    var isUC = userAgent.indexOf('UCBrowser') > -1; //判断是否UC浏览器

    var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; //判断是否IE7~IE10浏览器

    var isIE11 = userAgent.indexOf('compatible') === -1 && userAgent.indexOf('Trident') > -1; //判断是否IE11浏览器

    var isEdge = userAgent.indexOf('Edge') > -1; //判断是否IE的Edge浏览器

    var isChrome = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1; //判断Chrome浏览器

    var is360 = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('; WOW') > -1;

    var chromeVersion = 0;
    if (isChrome || is360) {
      chromeVersion = userAgent.match(/Chrome\/([0-9.]+)/)[1].split('.')[0];
    }
    // other browser
    return (chromeVersion !== 0 && chromeVersion < 88) || isQQ || isOpera || isIE || isUC || isIE11 || isEdge;
  };

  useEffect(() => {
    if (!window.$message) {
      window.$message = messageApi;
    }
    if (!window.$notify) {
      window.$notify = api;
      window.$notify.loading = (config = {}) => {
        const { key, message, duration = 4.5, description = '请稍等' } = config;
        api.open({
          key,
          message,
          description: (
            <div>
              <Spin indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />} style={{ marginRight: '6px' }} />
              <Text>{description}</Text>
            </div>
          ),
          duration,
        });
      };
    }
    if (!window.$modal) {
      window.$modal = modal;
    }
    setTokenByUrl();
  }, []);

  return (
    <StoresProvider>
      {isCompatible() ? (
        <ConfigProviderWrapper>
          <StyleProvider hashPriority="high" transformers={[legacyLogicalPropertiesTransformer]}>
            {contextHolder}
            {modalContextHolder}
            {messageContent}

            <Index />
          </StyleProvider>
        </ConfigProviderWrapper>
      ) : (
        <ConfigProviderWrapper>
          {contextHolder}
          {modalContextHolder}
          {messageContent}

          <Index />
        </ConfigProviderWrapper>
      )}
    </StoresProvider>
  );
}

export default observer(App);
