import { ColumnsType } from 'antd/lib/table'
import { FC } from 'react'
import { Image } from 'antd'
import { formatPrice } from 'utils/textUtils'
import TableCustom from 'components/TableCustom'
import SubSpaceBox from './SubSpaceBox'
import HeaderTotal from './HeaderTotal'
import { Package, ServiceSpace, SubSpace } from 'interfaces'

interface Props {
  serviceSpace: ServiceSpace
}

const SubSpaceTable: FC<Props> = ({serviceSpace}) => {

  const packages : Package[] = serviceSpace?.packages ? serviceSpace?.packages?.map((item) => ({
    id: item?.id,
    type: item?.type,
    note: item?.note,
    subSpaces: item?.subSpaces
  }))  : []

  const subSpaceInfo: SubSpace[] = []

  packages.forEach((item)  => {
    item.subSpaces.forEach(subSpace => {
      subSpace.packageType = subSpace.package?.type
      subSpaceInfo.push(subSpace)
    })
  })


  const columns: ColumnsType<SubSpace> = [
    {
      title: 'id',
      dataIndex: 'id',
      width: 80,
    },
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      width: 150,
      render: (data: any) => (
        <Image
          src={data ? data : `no-data.jpeg`}
          alt='image'
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '6px',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'title',
      width: 400,
    },
    {
      title: 'Number of People',
      dataIndex: 'numberOfPeople',
      width: 100,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (data) => formatPrice(data),
    },
    {
      title: 'Package Type',
      dataIndex: 'packageType',
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (data) => data ? 'Available' : 'Not Available',
    },
  ]

  return (
    <SubSpaceBox
      title={
        <HeaderTotal
          title={subSpaceInfo && subSpaceInfo?.length > 1 ? 'Items' : 'Item'}
          total={subSpaceInfo?.length}
        />
      }
    >
      <TableCustom columns={columns} data={subSpaceInfo} />
    </SubSpaceBox>
  )
}

export default SubSpaceTable
