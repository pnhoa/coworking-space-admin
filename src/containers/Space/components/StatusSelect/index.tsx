import { CheckCircleFilled } from '@ant-design/icons'
import { Dropdown, Menu, Spin } from 'antd'
import spaceApi from 'api/spaceApi'
import TagCustom from 'components/common/TagCustom'
import { ACTIVE_SPACE_CONST } from 'configs/localData'
import { FC, useMemo, useState } from 'react'
import { StatusWrapper, StatusItemStyles } from './styles'

interface Props {
  status: boolean
  spaceId: number
  refetch: () => void
}

const StatusSelect: FC<Props> = ({ status, spaceId, refetch }) => {
  const [loading, setLoading] = useState(false)

  const statusItem = useMemo(() => ACTIVE_SPACE_CONST.find((item) => item.value === status), [status])

  const isDisabled = useMemo(() => status !== false && status !== true, [status])

  const handleChange = async (value: boolean) => {
    setLoading(true)
    await spaceApi.hideSpace(
      {
        status: value,
        userId: localStorage.getItem('id'),
      },
      spaceId
    )
    setLoading(false)
    refetch()
  }

  const menu = (
    <Menu>
      {ACTIVE_SPACE_CONST.map((item) => (
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
            <div className='right-status'>{status === item.value && <CheckCircleFilled />}</div>
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
