import { ColumnsType } from 'antd/lib/table'
import { FC, useContext } from 'react'
import { formatExpiredDate, formatPrice } from 'utils/textUtils'
import TableCustom from 'components/TableCustom'
import { SpaceDetail, SpacePayment } from 'interfaces'
import { RestShowContext } from 'components/context/RestShowContext'
import BoxTitle from 'components/common/BoxTitle'
import { Divider } from 'antd'
import SpacePaymentInfoStyles from './styles'



const SpacePaymentTable: FC = () => {

  const { record } = useContext(RestShowContext) as {
    record: SpaceDetail
  }

  const columns: ColumnsType<SpacePayment> = [
    {
      title: 'id',
      dataIndex: 'id',
      width: 80,
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      width: 250,
      render: (data) => formatExpiredDate(data),
    },
    {
      title: 'Package Name',
      dataIndex: 'servicePackName',
      width: 400,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (data) => formatPrice(data),
    },
    {
      title: 'Expired Date',
      dataIndex: 'expiredTime',
      width: 250,
      render: (data) => formatExpiredDate(data),
    },
    {
      title: 'Out of Date',
      dataIndex: 'outOfDate',
      render: (data) => data ? 'Yes' : 'No',
    },
  ]

  return (
    <SpacePaymentInfoStyles className='box-wrapper'>
      <BoxTitle title={`Space Payment`} extraAction={null} />
      
      <Divider />
      <TableCustom columns={columns} data={record.spacePayments} />
      </SpacePaymentInfoStyles>
      
  )
}

export default SpacePaymentTable
