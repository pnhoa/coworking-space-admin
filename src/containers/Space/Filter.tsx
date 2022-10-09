import { Col, Form, Row, Select, Tooltip } from 'antd'
import RestFilter from 'components/RestLayout/RestFilter'
import { Category } from 'interfaces'
import { FC } from 'react'
import FormInput from './components/Filter/FormInput'

interface Props {
  onSubmitFilter: (value: any) => void
  onClearFilter: () => void
  categoryList?: Category[]
  countryList?: string[]
  provinceList?: string[]
  districtList?: string[]
}

const { Option } = Select

const SpaceFilter: FC<Props> = ({ onSubmitFilter, onClearFilter, categoryList, countryList, provinceList, districtList }) => {

  return (
    <RestFilter onSubmitFilter={onSubmitFilter} onClearFilter={onClearFilter}>
      <Row gutter={16}>
        <Col lg={8} md={12} xs={24}>
          <FormInput />
        </Col>
        <Col lg={4} md={12} xs={24}>
          <Tooltip title='Category'>
            <Form.Item name='categoryId'>
              <Select placeholder='Category'>
                {categoryList?.map((item: Category) => (
                  <Option key={item?.id} value={item?.id}>
                    {item?.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Tooltip>
        </Col>
        
        <Col lg={4} md={12} xs={24}>
          <Tooltip title='Country'>
            <Form.Item name='country'>
              <Select placeholder='Country'>
                {countryList?.map((item: string) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Tooltip>
        </Col>

        <Col lg={4} md={12} xs={24}>
          <Tooltip title='Province'>
            <Form.Item name='province'>
              <Select placeholder='Province'>
                {provinceList?.map((item: string) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Tooltip>
        </Col>

        <Col lg={4} md={12} xs={24}>
          <Tooltip title='District'>
            <Form.Item name='district'>
              <Select placeholder='District'>
                {districtList?.map((item: string) => (
                  <Option key={item} value={item}>
                    {item}
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

export default SpaceFilter
