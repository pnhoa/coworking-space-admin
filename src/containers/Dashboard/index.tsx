import { Col, Row } from 'antd'
import CategoryStatistics from './Chart'
import TotalCustomer from './components/TotalCustomer'
import TotalOrders from './components/TotalOrders'
import TotalRevenue from './components/TotalRevenue'
import TotalSales from './components/TotalSales'
import BestSellingProducts from './ProductSection/BestSellingProducts'

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
              <TotalSales />
            </Col>
            <Col span={12}>
              <TotalOrders />
            </Col>
          </Row>
        </Col>
        <Col span={14}>
          <CategoryStatistics />
        </Col>
      </Row>
      <Row gutter={[20, 20]} className='mt-20'>
        <Col span={10}>
          <BestSellingProducts />
        </Col>
        <Col span={14}>
        </Col>
      </Row>
    </>
  )
}

export default DashboardPage
