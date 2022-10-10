import { Col, Form, Input, InputNumber, Row, Select } from 'antd'
import FormUploadImage from 'components/common/FormUploadImage'
import { Category } from 'interfaces'
import { FC } from 'react'
import { formatterInputNumber, parserInputNumber } from 'utils/tools'

interface Props {
  extraItem?: any
  item?: any
}

const { Option } = Select

const SpaceForm: FC<Props> = ({ item, extraItem }) => {

  return (
    <Row gutter={32}>
      <Col span={12}>
        <Form.Item
          name='name'
          label='Name'
          rules={[{ required: true, message: 'Please enter space name' }]}
        >
          <Input placeholder='Please enter space name' />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name='categoryId'
          label='Category'
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <Select placeholder='Please select a category'>
            {extraItem?.map((item: Category) => (
              <Option key={item?.id} value={item?.id}>
                {item?.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name='numberOfRoom'
          label='Number of room'
          rules={[{ required: true, message: 'Please enter number of room' }]}
        >
          <InputNumber
            placeholder='Please enter number of room'
            formatter={formatterInputNumber}
            parser={parserInputNumber}
          />
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
          name='unit'
          label='Unit'
          rules={[{ required: true, message: 'Please enter unit' }]}
        >
          <Input placeholder='Please enter unit' />
        </Form.Item>
      </Col>
      <Col span={24}>
        <FormUploadImage name='largeImage' label='Thumbnail' />
      </Col>
    </Row>
  )
}

export default SpaceForm
