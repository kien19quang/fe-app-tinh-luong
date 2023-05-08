import { LayoutProps } from '@/models/common';
import { Breadcrumb, Layout, Menu, Row, Typography, theme, Input, Avatar, Popover, MenuProps, Button } from 'antd';
import LogoTLU from '@/assets/logo_tlu.svg';
import LogoTLUPreview from '@/assets/Logo_TLU_preview.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  AuditOutlined,
  BookOutlined,
  DollarCircleOutlined,
  HomeOutlined,
  MoneyCollectOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useRouter } from 'next/router';
import Link from 'next/link';

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;
const { Search } = Input;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  style?: React.CSSProperties,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    style,
    children,
    label,
    type,
  } as MenuItem;
}

const ListMenuItem: MenuProps['items'] = [
  getItem('Giáo viên', 'teachers', <TeamOutlined style={{ fontSize: 18 }} />, { fontSize: 16 }),
  getItem('Môn học', 'subjects', <BookOutlined style={{ fontSize: 18 }} />, { fontSize: 16 }),
  getItem('Lớp học', 'classes', <AuditOutlined style={{ fontSize: 18 }} />, { fontSize: 16 }),
  getItem('Lương chuẩn', 'standardSalary', <MoneyCollectOutlined style={{ fontSize: 18 }} />, { fontSize: 16 }),
  getItem('Bảng lương', 'salary', <DollarCircleOutlined style={{ fontSize: 18 }} />, { fontSize: 16 }),
];

const MainLayout = ({ children }: LayoutProps): JSX.Element => {
  const [siderCollapse, setSiderCollapse] = useState<boolean>(false);
  const [selectedKeyMenu, setSelectedKeyMenu] = useState<string[]>(['teachers']);
  const [titleSelect, setTitleSelect] = useState<string>('Giáo viên');
  const router = useRouter();
  const currentPathname = router.pathname;

  const { token } = theme.useToken();

  const handleClickMenu = (value: MenuInfo) => {
    if (value.key !== selectedKeyMenu[0]) {
      if (value.key !== 'teachers') {
        router.push({ pathname: `/${value.key}` });
      } else {
        router.push('/');
      }
    }
  };

  useEffect(() => {
    let res: string[] = ['teachers'];
    let newTitleSelect: string = 'Giáo viên';
    if (currentPathname.includes('/subjects')) {
      res = ['subjects'];
      newTitleSelect = 'Môn học';
    } else if (currentPathname.includes('/classes')) {
      res = ['classes'];
      newTitleSelect = 'Lớp học';
    } else if (currentPathname.includes('/salary')) {
      res = ['salary'];
      newTitleSelect = 'Bảng lương';
    } else if (currentPathname.includes('/standardSalary')) {
      res = ['standardSalary'];
      newTitleSelect = "Lương chuẩn (Theo giờ)";
    }
    setSelectedKeyMenu(res);
    setTitleSelect(newTitleSelect);
  }, [currentPathname]);

  const handleGoHomePage = () => {
    router.push('/')
  }

  return (
    <Layout hasSider style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={siderCollapse}
        onCollapse={(value) => setSiderCollapse(value)}
        theme="light"
        style={{
          boxShadow:
            '0px 24px 32px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04)',
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
        }}
      >
        <Row
          style={{
            height: !siderCollapse ? '54px' : '60px',
            width: !siderCollapse ? '140px' : '50px',
            margin: 'auto',
            cursor: 'pointer',
          }}
          align="middle"
          onClick={handleGoHomePage}
        >
          <Image
            src={!siderCollapse ? LogoTLU : LogoTLUPreview}
            alt="Logo Thăng Long"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Row>
        <Menu
          style={{ marginTop: '20px' }}
          selectedKeys={selectedKeyMenu}
          items={ListMenuItem}
          onClick={handleClickMenu}
        />
      </Sider>
      <Layout style={{ marginLeft: siderCollapse ? 80 : 200, backgroundColor: '#fff' }}>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '60px',
            backgroundColor: '#fff',
            boxShadow:
              '0px 4px 8px rgba(0, 0, 0, 0.04), 0px 0px 2px rgba(0, 0, 0, 0.06), 0px 0px 1px rgba(0, 0, 0, 0.04)',
            position: 'fixed',
            top: 0,
            right: 0,
            left: siderCollapse ? 80 : 200,
            zIndex: 10,
          }}
        >
          <Row style={{ width: '25%' }}>
            <Breadcrumb
              items={[
                {
                  title: (
                    <Link href="/">
                      <HomeOutlined style={{ fontSize: 18 }} />
                    </Link>
                  ),
                },
                { title: <Text style={{ fontWeight: 500, color: token.colorPrimary }}>{titleSelect}</Text> },
              ]}
              style={{ fontSize: '16px' }}
            />
          </Row>

          <Row style={{ width: '50%' }} justify="center" align="middle">
            <Search placeholder="Search for anything here" allowClear />
          </Row>

          <Row style={{ width: '25%' }} justify="end" align="middle">
            <Popover
              trigger="click"
              placement="bottomRight"
              content={
                <Row style={{ flexDirection: 'column' }}>
                  <Button type="link" style={{ color: token.colorPrimary }}>
                    Đăng xuất
                  </Button>
                </Row>
              }
            >
              <Avatar size={36} icon={<UserOutlined />} />
            </Popover>
          </Row>
        </Header>
        <Content style={{ padding: '40px', marginTop: '60px' }}>
          <Row
            style={{
              width: '100%',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              minHeight: '100vh',
            }}
          >
            {children}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
