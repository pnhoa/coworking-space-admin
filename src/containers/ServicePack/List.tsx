import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import servicePackApi from 'api/servicePackApi'
import CreateButton from 'components/actions/CreateButton'
import DeleteButton from 'components/actions/DeleteButton'
import EditButton from 'components/actions/EditButton'
import GroupActions from 'components/common/GroupActions'
import PageTitle from 'components/common/PageTitle'
import { ServicePack, ListParams } from 'interfaces'
import { parse, stringify } from 'query-string'
import { FC, useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import CreateServicePackModal from './Create'
import EditServicePackModal from './Edit'
import ServicePackFilter from './Filter'
import ListLayoutStyles from './styles'

const ServicePackList: FC = () => {
  const { search } = useLocation()
  const { push, location } = useHistory()

  const [servicePackList, setServicePackList] = useState<ServicePack[]>()
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
      page: 0,
      limit: 20,
    }
  }, [search])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const servicePacks = await servicePackApi.getAll(queryParams)
        setServicePackList(servicePacks)
      } catch (error) {
        console.log('Failed to fetch Service Pack list: ', error)
      }

      setLoading(false)
    })()
  }, [refetch, queryParams])

  const handleFilterChange = (newFilters: any) => {
    const filters = { ...queryParams, ...newFilters }
    push({
      pathname: location.pathname,
      search: stringify(filters),
    })
  }

  const handleClearFilter = () => {
    push({ pathname: location.pathname, search: '' })
  }

  const handleDeleteServicePack = async (id: string) => {
    await servicePackApi.remove(id)
    setRefetch(!refetch)
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 250,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: 550,
    },
    {
      title: 'Period',
      dataIndex: 'period',
      width: 550,
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
          <DeleteButton customTitle='ServicePack' deleteItem={() => handleDeleteServicePack(data)} />
        </GroupActions>
      ),
    },
  ] as ColumnsType<ServicePack>

  return (
    <ListLayoutStyles>
      <div>
        <PageTitle title='Service Package' />
        <ServicePackFilter onSubmitFilter={handleFilterChange} onClearFilter={handleClearFilter} />
        <div className='flex-center-end'>
          <CreateButton handleClick={() => setCreateProps({ visible: true })} />
        </div>
        <Table
          style={{ marginTop: '10px' }}
          dataSource={servicePackList}
          columns={columns}
          loading={loading}
          scroll={{ x: 1100 }}
        />
        <CreateServicePackModal
          refetch={() => setRefetch(!refetch)}
          visible={createProps.visible}
          closeModal={() => setCreateProps({ visible: false })}
        />
        <EditServicePackModal
          id={editProps.id}
          resource={servicePackList}
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

export default ServicePackList
