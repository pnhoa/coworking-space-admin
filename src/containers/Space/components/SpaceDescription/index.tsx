import { Col, Divider, Row } from 'antd'
import BoxTitle from 'components/common/BoxTitle'
import { RestShowContext } from 'components/context/RestShowContext'
import { SpaceDetail } from 'interfaces'
import { FC, useContext } from 'react'
import SpaceDescriptionInfoStyles from './styles'

const SpaceDescriptionDetailInfo: FC = () => {
  const { record } = useContext(RestShowContext) as {
    record: SpaceDetail
  }

  return (
    <SpaceDescriptionInfoStyles className='box-wrapper'>
      <BoxTitle title={`Space Description`} extraAction={null} />
      
      <Divider />

      <div className='status-info'>
        <Row gutter={20}>
          <Col span={3} className='fw-500'>Opening Date</Col>
          <Col span={6} >
            {record?.spaceDescription.openingDate}
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={3} className='fw-500'>Short Description</Col>
          <Col span={21} >
            {record?.spaceDescription.shortDescription || 'N/A'}
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={3} className='fw-500'>Description</Col>
          <Col span={21} >
            {record?.spaceDescription.description || 'N/A'}
          </Col>
        </Row>

      </div>

      
    </SpaceDescriptionInfoStyles>
  )
}

export default SpaceDescriptionDetailInfo
