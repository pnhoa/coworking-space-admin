import { Col, Divider, Row } from 'antd'
import BoxTitle from 'components/common/BoxTitle'
import ImageSlider from 'components/common/ImageSlider'
import { RestShowContext } from 'components/context/RestShowContext'
import { SpaceDetail } from 'interfaces'
import { FC, useContext } from 'react'
import { formatPrice } from 'utils/textUtils'
import SpaceOverviewInfoStyles from './styles'

const SpaceOverviewDetailInfo: FC = () => {
  const { record } = useContext(RestShowContext) as {
    record: SpaceDetail
  }

  return (
    <SpaceOverviewInfoStyles className='box-wrapper'>
      <BoxTitle title={`Space Overview`} extraAction={null} />
      
      <Divider />
      <div className='status-info'>
        <Row gutter={20}>
          <Col span={3} className='fw-500'>Images</Col>
          
          <Col span={12} >
            <ImageSlider images={record?.images}  />
          </Col>
        </Row>
        
        <Row gutter={20}>
          <Col span={3} className='fw-500'>Name</Col>
          <Col span={6} >
            {record?.name}
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={3} className='fw-500'>Owner/Publisher</Col>
          <Col span={6} >
            {record?.createdBy}
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={3} className='fw-500'>Average Price</Col>
          <Col span={21} >
            { formatPrice(record?.price) + '/' + record?.unit || 'N/A'}
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={3} className='fw-500'>Number Of Room</Col>
          <Col span={5} >
            {record?.numberOfRoom || 'N/A'}
          </Col>
          <Col span={3} className='fw-500'>Min Price</Col>
          <Col span={5} >
            {record?.minPrice || 'N/A'}
          </Col>
          <Col span={3} className='fw-500'>Max Price</Col>
          <Col span={5} >
            {record?.maxPrice || 'N/A'}
          </Col>
        </Row>

        <Row gutter={20}>
        <Col span={3} className='fw-500'>Acreage</Col>
          <Col span={5} >
            {record?.acreage || 'N/A'}
          </Col>
          <Col span={3} className='fw-500'>Electric Price</Col>
          <Col span={5} >
            {record?.electricPrice || 'N/A'}
          </Col>
          <Col span={3} className='fw-500'>Water Price</Col>
          <Col span={5} >
            {record?.waterPrice || 'N/A'}
          </Col>
        </Row>

      </div>

      
    </SpaceOverviewInfoStyles>
  )
}

export default SpaceOverviewDetailInfo
