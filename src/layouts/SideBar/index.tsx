import {
  AppstoreOutlined,
  BarsOutlined,
  TeamOutlined,
  BuildOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import employeeApi from 'api/employeeApi'
import CheckPermissions from 'components/common/CheckPermissions'
import { Employee, ROLES } from 'interfaces'
import { FC, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { SIDEBAR_WIDTH } from 'theme/constants'
import { SidebarMenuItemProps } from './interface'
import MenuItem from './MenuItem'
import SideBarStyles from './styles'

const getCurrentTab = (str: string) => {
  const paths = str && str.split('/')
  return paths && paths[1]
}

const { Sider } = Layout

const SideBar: FC = () => {
  const { pathname } = useLocation()
  const { push } = useHistory()
  const [roleCode, setRoleCode] = useState<ROLES>()

  useEffect(() => {
    ;(async () => {
      try {
        const id = Number(localStorage.getItem('id'))
        const data: Employee = await employeeApi.getById(id)
        setRoleCode(data.roleCode)
      } catch (error) {
        console.log('Failed to fetch profile: ', error)
      }
    })()
  }, [])

  const url = getCurrentTab(pathname)

  const sidebarMenu = [
    {
      key: 'home',
      text: 'Dashboard',
      IconCPN: AppstoreOutlined,
      url: '/',
    },
    {
      key: 'spaces',
      text: 'Spaces',
      IconCPN: BuildOutlined,
      url: '/spaces',
    },
    {
      key: 'categories',
      text: 'Categories',
      IconCPN: BarsOutlined,
      url: '/categories',
    },
    {
      key: 'customers',
      text: 'Customers',
      IconCPN: UserOutlined,
      url: '/customers',
    },
    {
      key: 'employees',
      text: 'Employees',
      IconCPN: TeamOutlined,
      url: '/employees',
      disabledPermission: roleCode === ROLES.EMPLOYEE,
    },
  ] as SidebarMenuItemProps[]

  const activeItem = sidebarMenu.findIndex((item) => item.url === pathname)

  const handleClick = () => {
    push('/')
  }

  return (
    <SideBarStyles>
      <Sider className='sidebar' width={SIDEBAR_WIDTH} theme='light'>
        <div className='logo' onClick={handleClick}>
          <img src='logo.png' alt='logo' />
        </div>
        <Menu mode='inline' selectedKeys={[url || 'home']} defaultSelectedKeys={[url || 'home']}>
          {sidebarMenu.map((menu, index) => (
            <CheckPermissions
              key={menu.key}
              disabled={menu.disabledPermission ? menu.disabledPermission : false}
            >
              <MenuItem menu={menu} active={index === activeItem} />
            </CheckPermissions>
          ))}
        </Menu>
      </Sider>
    </SideBarStyles>
  )
}

export default SideBar
