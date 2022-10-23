import { CheckCircleFilled } from '@ant-design/icons'
import { Dropdown, Menu, notification, Spin } from 'antd'
import bookingApi from 'api/bookingApi'
import TagCustom from 'components/common/TagCustom'
import { BOOKING_STATUS } from 'configs/localData'
import { Status } from 'interfaces'
import { FC, useMemo, useState } from 'react'
import { StatusWrapper, StatusItemStyles } from './styles'

interface Props {
  status: string
  bookingId: number
  refetch: () => void
}

const StatusSelect: FC<Props> = ({ status, bookingId, refetch }) => {
  const [loading, setLoading] = useState(false)

  const statusItem = useMemo(() => BOOKING_STATUS.find((item) => item.value === status), [status])

  const isDisabled = useMemo(() => status === Status.COMPLETED || status === Status.CANCELLED, [status])

  const handleChange = async (value: string) => {
    if(Status.BOOKED === statusItem?.value) {
      if(value !== Status.COMPLETED) {
        notification.warning({ message: 'Only change status to completed!'})
        return
      }
    }
    if(Status.PENDING === statusItem?.value) {
      if(value === Status.COMPLETED) {
        notification.warning({ message: 'Only change status to booked or cancelled!'})
        return
      }
    }
    setLoading(true)
    await bookingApi.updateStatus(
      {
        userId: localStorage.getItem('id'),
        status: value,
      },
      bookingId
    )
    setLoading(false)
    refetch()
  }

  const menu = (
    <Menu>
      {BOOKING_STATUS.map((item) => (
        <Menu.Item key={item.value}>
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
