import statisticsApi from 'api/statisticsApi'
import StatisticsCard from 'components/common/StatisticsCard'
import { ReportParams } from 'interfaces'
import { useEffect, useState } from 'react'
import { formatPrice } from 'utils/textUtils'

interface Props {
  timeQuery?: ReportParams
}

const TotalRevenue = ({ timeQuery }: Props) => {
  const [totalRevenue, setTotalRevenue] = useState(0)

  const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const d = new Date();
  let mon = month[d.getMonth()];
  let year = d.getFullYear();

  useEffect(() => {
    ;(async () => {
      try {
        const count = await statisticsApi.getRevenue(timeQuery)
        setTotalRevenue(count)
      } catch (error) {
        console.log('Failed to fetch', error)
      }
    })()
  }, [timeQuery])

  return <StatisticsCard title={'Total Revenue ' + mon + '-' + year} customCount={formatPrice(totalRevenue)} />
}

export default TotalRevenue
