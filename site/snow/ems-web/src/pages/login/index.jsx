import { getToken } from '@api';
import { encrypt } from '@u/tools';
import { Button, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useStores from '../../store';

export default function Index() {
  const { globalStore } = useStores();
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem(process.env.REACT_APP_TOKEN_FIELD);
    if (token) {
      // 更新页面菜单数据等
      globalStore.reInit = !globalStore.reInit;
      navigate('/dashboard');
    }
  }, []);

  const handleLogin = data => {
    const redirect = search.get('redirect');
    setLoading(true);
    getToken({
      ...data,
      passWord: encrypt(data.passWord),
    })
      .then(res => {
        const { access_token } = res.data;
        sessionStorage.setItem(process.env.REACT_APP_TOKEN_FIELD, access_token);
        if (redirect) {
          return (window.location.href = redirect);
        }
        globalStore.reInit = !globalStore.reInit;
        navigate('/dashboard');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-container-header">
          <div className="login-container-logo"></div>
        </div>
        <div className="login-container-main">
          <div className="login-container-form-container">
            <div className="login-text">账号密码登录</div>
            <Form
              name="basic"
              layout="vertical"
              onFinish={handleLogin}
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
            >
              <Form.Item
                label="用户名"
                name="userName"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="请输入用户名" />
              </Form.Item>

              <Form.Item
                label="密码"
                name="passWord"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.Password placeholder="请输入密码" />
              </Form.Item>

              <Form.Item>
                <Button loading={loading} type="primary" htmlType="submit" style={{ width: '100%', marginTop: '24px' }}>
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="login-container-footer">
          <span>Copyright©2018 华润啤酒有限公司</span>
        </div>
      </div>
    </div>
  );
}
