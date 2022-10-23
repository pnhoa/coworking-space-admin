import { Col, Form, Row, Select, Tooltip } from 'antd'
import RestFilter from 'components/RestLayout/RestFilter'
import { BOOKING_STATUS } from 'configs/localData'
import { FC } from 'react'
import FormInput from './components/Filter/FormInput'

interface Props {
  onSubmitFilter: (value: any) => void
  onClearFilter: () => void
}

const { Option } = Select

const BookingFilter: FC<Props> = ({ onSubmitFilter, onClearFilter }) => {
  return (
    <RestFilter onSubmitFilter={onSubmitFilter} onClearFilter={onClearFilter}>
      <Row gutter={16}>
        <Col lg={8} md={12} xs={24}>
          <FormInput />
        </Col>
        <Col lg={8} md={12} xs={24}>
          <Tooltip title='Status'>
            <Form.Item name='status'>
              <Select placeholder='Status'>
                {BOOKING_STATUS.map((item) => (
                  <Option key={item.value} value={item.value}>
                    {item.text}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Tooltip>
        </Col>
      </Row>
    </RestFilter>
  )
}

export default BookingFilter
