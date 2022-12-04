import { CheckCircleFilled } from '@ant-design/icons'
import { Dropdown, Menu, notification, Spin } from 'antd'
import employeeApi from 'api/employeeApi'
import TagCustom from 'components/common/TagCustom'
import { ACTIVE_CONST } from 'configs/localData'
import { FC, useMemo, useState } from 'react'
import { StatusWrapper, StatusItemStyles } from './styles'

interface Props {
  enabled: number
  userId: number
  refetch: () => void
}

const StatusSelect: FC<Props> = ({ enabled, userId, refetch }) => {
  const [loading, setLoading] = useState(false)

  const statusItem = useMemo(() => ACTIVE_CONST.find((item) => item.value === enabled), [enabled])

  const isDisabled = useMemo(() => enabled === 1, [enabled])

  const handleChange = async (value: number) => {
    setLoading(true)
    try {
      await employeeApi.active(userId)
    } catch (error) {
      notification.error({
        message: 'Failed active account!'
      })
    }
    
    
    setLoading(false)
    refetch()
  }

  const menu = (
    <Menu>
      {ACTIVE_CONST.map((item) => (
        <Menu.Item key={item.text}>
          <StatusItemStyles
            className='item-status'
            role='presentation'
            onClick={() => handleChange(item.value)}
            style={{
              color: item.colorText,
              background: item.backgroundColor,
            }}
          >
            <div className='left-status'>
              <span className='name-status'>{item.text}</span>
            </div>
            <div className='right-status'>{enabled === item.value && <CheckCircleFilled />}</div>
          </StatusItemStyles>
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <StatusWrapper>
      <Dropdown disabled={isDisabled} overlay={menu} trigger={['click']}>
        <div>
          <TagCustom
            style={{
              backgroundColor: statusItem?.backgroundColor,
              color: statusItem?.colorText,
            }}
            className={`pointer ${isDisabled ? 'tag-status-disabled' : ''}`}
            text={statusItem?.text}
          />
          {loading && <Spin className='ml-5' />}
        </div>
      </Dropdown>
    </StatusWrapper>
  )
}

export default StatusSelect
