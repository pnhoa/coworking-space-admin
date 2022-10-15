import { ChromeOutlined, FacebookOutlined, InstagramOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { Col, Divider, Row } from 'antd'
import BoxTitle from 'components/common/BoxTitle'
import { RestShowContext } from 'components/context/RestShowContext'
import { SpaceDetail } from 'interfaces'
import { FC, useContext } from 'react'
import SpaceContactInfoStyles from './styles'

const SpaceContactDetailInfo: FC = () => {
  const { record } = useContext(RestShowContext) as {
    record: SpaceDetail
  }

  return (
    <SpaceContactInfoStyles className='box-wrapper'>
      <BoxTitle title={`Space Contact`} extraAction={null} />
      
      <Divider />

      <div className='status-info'>
        <Row gutter={20}>
          <Col span={12} className='fw-500'><MailOutlined />  Email</Col>
          <Col span={12} >
            {record?.spaceContact.email}
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={12} className='fw-500'><PhoneOutlined />  Phone</Col>
          <Col span={12}>
            {record?.spaceContact.phone}
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={12} className='fw-500'><FacebookOutlined/>  Facebook</Col>
          <Col span={12} >
            {record?.spaceContact.facebookUrl || 'N/A'}
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={12} className='fw-500'><InstagramOutlined />  Instagram</Col>
          <Col span={12} >
            {record?.spaceContact.instagramUrl || 'N/A'}
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={12} className='fw-500'><ChromeOutlined />  Website</Col>
          <Col span={12} >
            {record?.spaceContact.websiteUrl || 'N/A'}
          </Col>
        </Row>

      </div>

      
    </SpaceContactInfoStyles>
  )
}

export default SpaceContactDetailInfo
