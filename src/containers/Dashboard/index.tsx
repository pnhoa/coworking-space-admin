import { Col, Row } from 'antd'
import CategoryStatistics from './Chart'
import TotalCustomer from './components/TotalCustomer'
import TotalBookings from './components/TotalBookings'
import TotalRevenue from './components/TotalRevenue'
import TotalSpaces from './components/TotalSpaces'
import BestSellingSpaces from './SpaceSection/BestSellingSpaces'
import LatestSpaces from './LatestSpaceSection/LatestSpaces'

const DashboardPage = () => {
  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={10}>
          <Row gutter={20}>
            <Col span={12}>
              <TotalCustomer />
            </Col>
            <Col span={12}>
              <TotalRevenue />
            </Col>
          </Row>
          <Row gutter={20} className='mt-20'>
            <Col span={12}>
              <TotalSpaces />
            </Col>
            <Col span={12}>
              <TotalBookings />
            </Col>
          </Row>
        </Col>
        <Col span={14}>
          <CategoryStatistics />
        </Col>
      </Row>
      <Row gutter={[20, 20]} className='mt-20'>
        <Col span={10}>
          <BestSellingSpaces />
        </Col>
        <Col span={14}>
          <LatestSpaces />
        </Col>
      </Row>
    </>
  )
}

export default DashboardPage
