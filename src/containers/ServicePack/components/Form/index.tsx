import { Col, Form, Input, InputNumber, Row } from 'antd'
import { FC } from 'react'
import { formatterInputNumber, parserInputNumber } from 'utils/tools'

const ServicePackForm: FC = () => {
  return (
    <Row gutter={32}>
      <Col span={12}>
        <Form.Item
          name='name'
          label='Name'
          rules={[{ required: true, message: 'Please enter service package name' }]}
        >
          <Input placeholder='Please enter service package name' />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name='price'
          label='Price'
          rules={[{ required: true, message: 'Please enter price' }]}
        >
          <InputNumber
            placeholder='Please enter price'
            formatter={formatterInputNumber}
            parser={parserInputNumber}
          />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name='period'
          label='Period'
          rules={[{ required: true, message: 'Please enter period' }]}
        >
          <InputNumber
            placeholder='Please enter period'
            formatter={formatterInputNumber}
            parser={parserInputNumber}
          />
        </Form.Item>
      </Col>
    
    </Row>
  )
}

export default ServicePackForm
