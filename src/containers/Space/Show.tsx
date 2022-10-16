import spaceApi from 'api/spaceApi'
import CollapseWrapper from 'components/common/CollapseWrapper'
import RestShow from 'components/RestLayout/RestShow'
import { IParamsRouterShowPage, SpaceDetail as Space} from 'interfaces'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ServiceSpaceDetailInfo from './components/ServiceSpace/ServiceSpaceInfo'
import SubSpaceTable from './components/ServiceSpace/SubSpaceTable'
import SpaceAddressDetailInfo from './components/SpaceAddress'
import SpaceAmenityDetailInfo from './components/SpaceAmenity'
import SpaceContactDetailInfo from './components/SpaceContact'
import SpaceDescriptionDetailInfo from './components/SpaceDescription'
import SpaceOverviewDetailInfo from './components/SpaceOverview'
import SpacePaymentTable from './components/SpacePayment'
function SpaceDetail() {
  const [record, setRecord] = useState<Space>()
  const { id }: IParamsRouterShowPage = useParams()

  useEffect(() => {
    ;(async () => {
      const data = await  spaceApi.getById(Number(id))
      setRecord(data)
    })()
  }, [id])

  const formatBreadcrumb = (record: Space) => [
    {
      title: 'Spaces',
      path: '/spaces',
    },
    {
      title: `Space#${record?.id}` || '',
    },
  ]

  return (
    <RestShow resource='Space' formatBreadcrumb={formatBreadcrumb} record={record}>
      <SpaceOverviewDetailInfo />
      <SpaceDescriptionDetailInfo/>
      <CollapseWrapper leftComponent={<SpaceAddressDetailInfo />} rightComponent={<SpaceContactDetailInfo/>} leftSpan={12} rightSpan={12}/>
      <SpaceAmenityDetailInfo />

      <SpacePaymentTable />
      
      {(record?.serviceSpaces)?.map((serviceSpace) => {
        return (<CollapseWrapper key={serviceSpace.id} leftComponent={<ServiceSpaceDetailInfo key={serviceSpace.id} serviceSpace={serviceSpace} />} 
        rightComponent={<SubSpaceTable key={serviceSpace.id} serviceSpace={serviceSpace} />} leftSpan={6} rightSpan={18}/>)
      })}
      
    </RestShow>
    
  )
}

export default SpaceDetail
