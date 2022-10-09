import { CheckCircleFilled } from '@ant-design/icons'
import { Dropdown, Menu, Spin } from 'antd'
import spaceApi from 'api/spaceApi'
import TagCustom from 'components/common/TagCustom'
import { APPROVED_CONST } from 'configs/localData'
import { FC, useMemo, useState } from 'react'
import { StatusWrapper, StatusItemStyles } from './styles'

interface Props {
  approved: boolean
  spaceId: number
  refetch: () => void
}

const ApprovedSelect: FC<Props> = ({ approved, spaceId, refetch }) => {
  const [loading, setLoading] = useState(false)

  const statusItem = useMemo(() => APPROVED_CONST.find((item) => item.value === approved), [approved])

  const isDisabled = useMemo(() => approved === true, [approved])

  const handleChange = async (value: boolean) => {
    setLoading(true)
    await spaceApi.approveSpace(
      {
        userId: localStorage.getItem('id'),
        approved: value,
      },
      spaceId
    )
    setLoading(false)
    refetch()
  }

  const menu = (
    <Menu>
      {APPROVED_CONST.map((item) => (
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
            <div className='right-status'>{approved === item.value && <CheckCircleFilled />}</div>
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

export default ApprovedSelect
