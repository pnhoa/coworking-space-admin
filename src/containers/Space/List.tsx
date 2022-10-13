import { Image, Pagination } from 'antd'
import Table, { ColumnsType } from 'antd/lib/table'
import categoryApi from 'api/categoryApi'
import spaceApi from 'api/spaceApi'
import DeleteButton from 'components/actions/DeleteButton'
import EditButton from 'components/actions/EditButton'
import GroupActions from 'components/common/GroupActions'
import PageTitle from 'components/common/PageTitle'
import { Category, ListParams, ListResponse, PaginationParams, Space } from 'interfaces'
import { parse, stringify } from 'query-string'
import { FC, useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { formatCategoryById, formatExpiredDate, formatPrice, formatSpacePaid } from 'utils/textUtils'
import ApprovedSelect from './components/ApprovedSelect'
import StatusSelect from './components/StatusSelect'
import CreateSpaceModal from './Create'
import EditSpaceModal from './Edit'
import SpaceFilter from './Filter'
import ListLayoutStyles from './styles'

const SpaceList: FC = () => {
  const { search } = useLocation()
  const { push, location } = useHistory()

  const [spaceList, setSpaceList] = useState<Space[]>()
  const [categoryList, setCategoryList] = useState<Category[]>()
  const [countryList, setCountryList] = useState<string[]>()
  const [provinceList, setProvinceList] = useState<string[]>()
  const [districtList, setDistrictList] = useState<string[]>()
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 0,
    limit: 20,
    total: 20,
  })
  const [loading, setLoading] = useState(true)
  const [createProps, setCreateProps] = useState({
    visible: false,
  })
  const [editProps, setEditProps] = useState({
    visible: false,
    id: undefined,
  })
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
        const { data, pagination }: ListResponse<Space> = await spaceApi.getAll(queryParams)
        setSpaceList(data)
        setPagination(pagination)
      } catch (error) {
        console.log('Failed to fetch space list: ', error)
      }

      setLoading(false)
    })()
  }, [queryParams, refetch])

  useEffect(() => {
    ;(async () => {
      try {
        const categories = await categoryApi.getAll()
        setCategoryList(
          categories.map((category) => ({
            id: category.id,
            name: category.name,
          }))
        )
      } catch (error) {
        console.log('Failed to fetch category list: ', error)
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        const countries = await spaceApi.getCountries()
        setCountryList(
          countries
        )
      } catch (error) {
        console.log('Failed to fetch country list: ', error)
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        const provinces = await spaceApi.getProvinces()
        setProvinceList(
          provinces
        )
      } catch (error) {
        console.log('Failed to fetch province list: ', error)
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        const districts = await spaceApi.getDistricts()
        setDistrictList(
          districts
        )
      } catch (error) {
        console.log('Failed to fetch district list: ', error)
      }
    })()
  }, [])

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

  const handleDeleteSpace = async (id: string) => {
    await spaceApi.remove(id)
    setRefetch(!refetch)
  }

  const columns = [
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
      dataIndex: 'name',
      key: 'name',
      width: 500,
    },
    {
      title: 'Category',
      dataIndex: 'categoryId',
      key: 'categoryId',
      width: 150,
      render: (data) => formatCategoryById(data, categoryList),
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
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
      width: 90,
    },
    {
      title: 'Available',
      dataIndex: 'numberOfRoom',
      width: 150,
      key: 'numberOfRoom',
      sorter: (a: Space, b: Space) => a.numberOfRoom - b.numberOfRoom,
    },
    {
      title: 'Approved',
      dataIndex: 'approved',
      width: 140,
      render: (approved, record) => (
        <ApprovedSelect approved={approved} spaceId={record.id} refetch={() => setRefetch(!refetch)} />
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 140,
      render: (status, record) => (
        <StatusSelect status={status} spaceId={record.id} refetch={() => setRefetch(!refetch)} />
      ),
    },
    {
      title: 'Paid',
      dataIndex: 'paid',
      width: 90,
      render: (data) => formatSpacePaid(data),
    },

    {
      title: 'Expired Date',
      dataIndex: 'expiredDate',
      key: 'expiredDate',
      width: 140,
      render: (data) => formatExpiredDate(data),
      sorter: (a: Space, b: Space) => new Date(a.expiredDate).getTime() - new Date(b.expiredDate).getTime(),
    },

    {
      fixed: 'right',
      width: 80,
      dataIndex: 'id',
      key: 'id',
      render: (data) => (
        <GroupActions>
          <EditButton
            handleClick={() =>
              setEditProps({
                visible: true,
                id: data,
              })
            }
          />
          <DeleteButton customTitle='Space' deleteItem={() => handleDeleteSpace(data)} />
        </GroupActions>
      ),
    },
  ] as ColumnsType<Space>

  return (
    <ListLayoutStyles>
      <div>
        <PageTitle title='Spaces' />
        <SpaceFilter
          onSubmitFilter={handleFilterChange}
          onClearFilter={handleClearFilter}
          categoryList={categoryList}
          countryList={countryList}
          provinceList={provinceList}
          districtList={districtList}
        />
        <Table
          style={{ marginTop: '10px' }}
          dataSource={spaceList}
          columns={columns}
          rowKey='id'
          pagination={false}
          loading={loading}
          scroll={{ x: 1500 }}
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
        <CreateSpaceModal
          refetch={() => setRefetch(!refetch)}
          extraResource={categoryList}
          visible={createProps.visible}
          closeModal={() => setCreateProps({ visible: false })}
        />
        <EditSpaceModal
          id={editProps.id}
          resource={spaceList}
          extraResource={categoryList}
          visible={editProps.visible}
          closeModal={() =>
            setEditProps({
              ...editProps,
              visible: false,
            })
          }
          refetch={() => setRefetch(!refetch)}
        />
      </div>
    </ListLayoutStyles>
  )
}

export default SpaceList
