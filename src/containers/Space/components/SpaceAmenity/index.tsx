import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Col, Divider, Row } from 'antd'
import BoxTitle from 'components/common/BoxTitle'
import { RestShowContext } from 'components/context/RestShowContext'
import { SpaceDetail } from 'interfaces'
import { FC, useContext } from 'react'
import SpaceAmenityInfoStyles from './styles'

const SpaceAmenityDetailInfo: FC = () => {
  const { record } = useContext(RestShowContext) as {
    record: SpaceDetail
  }

  return (
    <SpaceAmenityInfoStyles className='box-wrapper'>
      <BoxTitle title={`Space Amenity`} extraAction={null} />
      
      <Divider />

      <div className='status-info'>
        <Row gutter={20}>
          <Col span={3} className='fw-500'>Internet</Col>
          <Col span={1} >
            {record?.spaceAmenity.internet ? <CheckOutlined /> : <CloseOutlined />}
          </Col>
          <Col span={3} className='fw-500'>TV</Col>
          <Col span={1} >
            {record?.spaceAmenity.tv ? <CheckOutlined /> : <CloseOutlined />}
          </Col>
          <Col span={3} className='fw-500'>Parking</Col>
          <Col span={1} >
            {record?.spaceAmenity.parking ? <CheckOutlined /> : <CloseOutlined />}
          </Col>
          <Col span={3} className='fw-500'>Air Conditioner</Col>
          <Col span={1} >
            {record?.spaceAmenity.airConditioner ? <CheckOutlined /> : <CloseOutlined />}
          </Col>
          <Col span={3} className='fw-500'>Heater</Col>
          <Col span={1} >
            {record?.spaceAmenity.heater ? <CheckOutlined /> : <CloseOutlined />}
          </Col>
          
        </Row>

        <Row gutter={20}>
          
          <Col span={3} className='fw-500'>Cable TV</Col>
          <Col span={1} >
            {record?.spaceAmenity.cableTV ? <CheckOutlined /> : <CloseOutlined />}
          </Col>
          <Col span={3} className='fw-500'>Toilet</Col>
          <Col span={1} >
            {record?.spaceAmenity.toilet ? <CheckOutlined /> : <CloseOutlined />}
          </Col>
          <Col span={3} className='fw-500'>Motel</Col>
          <Col span={1} >
            {record?.spaceAmenity.motel ? <CheckOutlined /> : <CloseOutlined />}
          </Col>
          <Col span={3} className='fw-500'>Catering</Col>
          <Col span={1} >
            {record?.spaceAmenity.catering ? <CheckOutlined /> : <CloseOutlined />}
          </Col>
        </Row>
      </div>

      
    </SpaceAmenityInfoStyles>
  )
}

export default SpaceAmenityDetailInfo
