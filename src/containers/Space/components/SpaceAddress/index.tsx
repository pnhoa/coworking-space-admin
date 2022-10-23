import { Col, Divider, Row } from 'antd'
import BoxTitle from 'components/common/BoxTitle'
import { RestShowContext } from 'components/context/RestShowContext'
import { SpaceDetail } from 'interfaces'
import { FC, useContext } from 'react'
import SpaceAddressInfoStyles from './styles'

const SpaceAddressDetailInfo: FC = () => {
  const { record } = useContext(RestShowContext) as {
    record: SpaceDetail
  }

  return (
    <SpaceAddressInfoStyles className='box-wrapper'>
      <BoxTitle title={`Space Address`} extraAction={null} />
      
      <Divider />

      <div className='status-info'>
        <Row gutter={20}>
          <Col span={6} className='fw-500'>Location Name</Col>
          <Col span={14} >
            {record?.spaceAddress.locationName}
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={6} className='fw-500'>Address Line 1</Col>
          <Col span={6} >
            {record?.spaceAddress.addressLine1}
          </Col>
          <Col span={6} className='fw-500'>Address Line 2</Col>
          <Col span={6} >
            {record?.spaceAddress.addressLine2 || 'N/A'}
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={6} className='fw-500'>Floor number</Col>
          <Col span={6} >
            {record?.spaceAddress.floorNumber || 'N/A'}
          </Col>
          <Col span={6} className='fw-500'>ZipCode</Col>
          <Col span={6} >
            {record?.spaceAddress.zipCode || 'N/A'}
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={6} className='fw-500'>Country</Col>
          <Col span={6} >
            {record?.spaceAddress.country || 'N/A'}
          </Col>
          <Col span={6} className='fw-500'>Province</Col>
          <Col span={6} >
            {record?.spaceAddress.province || 'N/A'}
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={6} className='fw-500'>District</Col>
          <Col span={6} >
            {record?.spaceAddress.district || 'N/A'}
          </Col>
          <Col span={6} className='fw-500'>SubDistrict</Col>
          <Col span={6} >
            {record?.spaceAddress.subDistrict || 'N/A'}
          </Col>
        </Row>

      </div>

      
    </SpaceAddressInfoStyles>
  )
}

export default SpaceAddressDetailInfo
