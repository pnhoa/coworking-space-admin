import { Image, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import spaceApi from 'api/spaceApi'
import ApprovedSelect from 'containers/Space/components/ApprovedSelect'
import { Space, ListParams, ListResponse } from 'interfaces'
import { useEffect, useState } from 'react'
import {
  formatPrice,
} from 'utils/textUtils'
import ReportCard from '../components/ReportCard'

const LatestSpaces = () => {
  const [latestSpaceList, setLatestSpaceList] = useState<Space[]>()
  const [loading, setLoading] = useState(false)
  const [refetch, setRefetch] = useState(false)

  const queryParams: ListParams = {
    page: 0,
    limit: 5,
    sort: 'id,DESC',
  }

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const { data }: ListResponse<Space> = await spaceApi.getAllForDashboard(queryParams)
        setLatestSpaceList(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log('Failed to fetch', error)
      }
    })()
  }, [refetch]) // eslint-disable-line

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 50,
    },
    {
      title: 'Image',
      dataIndex: 'largeImage',
      key: 'largeImage',
      width: 120,
      render: (data: any) => (
        <Image
          src={data ? data : `no-data.jpeg`}
          alt='image'
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '6px',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 500,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 150,
      sorter: (a: Space, b: Space) => a.price - b.price,
      render: (data) => formatPrice(data),
    },

    {
      title: 'Approved',
      dataIndex: 'approved',
      width: 140,
      render: (approved, record) => (
        <ApprovedSelect approved={approved} spaceId={record.id} refetch={() => setRefetch(!refetch)} />
      ),
    },

  ] as ColumnsType<Space>

  return (
    <ReportCard title='Space Pending Approval'>
      <Table
        columns={columns}
        dataSource={latestSpaceList}
        pagination={false}
        loading={loading}
        scroll={{ x: 750 }}
      />
    </ReportCard>
  )
}

export default LatestSpaces
