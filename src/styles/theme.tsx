import * as React from 'react';
import { ConfigProvider } from 'antd';

export default function Theme(children: JSX.Element) {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#3aa39f', colorTextSecondary: "#A2A3B1" } }}>
      {children}
    </ConfigProvider>
  );
}
