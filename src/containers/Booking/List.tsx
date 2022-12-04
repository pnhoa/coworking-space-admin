import { Pagination, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import bookingApi from 'api/bookingApi'
import NoteButton from 'components/actions/NoteButton'
import GroupActions from 'components/common/GroupActions'
import PageTitle from 'components/common/PageTitle'
import { Booking, ListParams, ListResponse, PaginationParams } from 'interfaces'
import { parse, stringify } from 'query-string'
import { FC, useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { formatDate, formatPrice } from 'utils/textUtils'
import StatusSelect from './components/StatusSelect'
import OrderFilter from './Filter'
import ListLayoutStyles from './styles'

const BookingList: FC = () => {
  const { search } = useLocation()
  const { push, location } = useHistory()

  const [bookingList, setOrderList] = useState<Booking[]>()

  const [pagination, setPagination] = useState<PaginationParams>({
    page: 0,
    limit: 20,
    total: 20,
  })

  const [loading, setLoading] = useState(true)

  const [refetch, setRefetch] = useState(false)

  const queryParams: ListParams = useMemo(() => {
    const params = parse(search)
    return {
      ...params,
      page: Number(params.page) || 0,
      limit: Number(params.limit) || 20,
    }
  }, [search])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const { data, pagination }: ListResponse<Booking> = await bookingApi.getAll(queryParams)
        setOrderList(data)
        setPagination(pagination)
      } catch (error) {
        console.log('Failed to fetch booking list: ', error)
      }

      setLoading(false)
    })()
  }, [queryParams, refetch])

  const handlePageChange = (page: number) => {
    const filters = {
      ...queryParams,
      page: page - 1,
    }
    push({
      pathname: location.pathname,
      search: stringify(filters),
    })
  }

  const handleFilterChange = (newFilters: any) => {
    const filters = {
      ...queryParams,
      page: 0,
      ...newFilters,
    }
    push({
      pathname: location.pathname,
      search: stringify(filters),
    })
  }

  const handleClearFilter = () => {
    push({ pathname: location.pathname, search: '' })
  }

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      width: 40,
      sorter: (a: Booking, b: Booking) => a.id - b.id,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 150,
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      width: 150,
    },
    {
      title: 'Total price',
      dataIndex: 'totalPrice',
      sorter: (a: Booking, b: Booking) => a.totalPrice - b.totalPrice,
      width: 180,
      render: (data) => formatPrice(data),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 150,
      render: (status, record) => (
        <StatusSelect status={status} bookingId={record.id} refetch={() => setRefetch(!refetch)} />
      ),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      width: 150,
      render: (data) => formatDate(data),
    },
    {
      fixed: 'right',
      width: 80,
      dataIndex: 'id',
      key: 'id',
      render: (id, record) => (
        <GroupActions>
          <NoteButton title={record?.note} />
        </GroupActions>
      ),
    },
  ] as ColumnsType<Booking>

  return (
    <ListLayoutStyles>
      <div>
        <PageTitle title='Bookings' />
        <OrderFilter onSubmitFilter={handleFilterChange} onClearFilter={handleClearFilter} />
        <Table
          style={{ marginTop: '10px' }}
          dataSource={bookingList}
          columns={columns}
          rowKey='id'
          pagination={false}
          loading={loading}
          scroll={{ x: 1600 }}
        />
        <div className='list-layout__pagination-bottom'>
          <Pagination
            defaultCurrent={1}
            total={pagination.total}
            current={pagination.page}
            onChange={handlePageChange}
            showQuickJumper
            defaultPageSize={20}
          />
        </div>
      </div>
    </ListLayoutStyles>
  )
}

export default BookingList
