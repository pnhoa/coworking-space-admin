import statisticsApi from 'api/statisticsApi'
import StatisticsCard from 'components/common/StatisticsCard'
import { ReportParams } from 'interfaces'
import { useEffect, useState } from 'react'

interface Props {
  timeQuery?: ReportParams
}

const TotalBookings = ({ timeQuery }: Props) => {
  const [totalBookings, setTotalBookings] = useState(0)

  useEffect(() => {
    ;(async () => {
      try {
        const count = await statisticsApi.getTotalBookings(timeQuery)
        setTotalBookings(count)
      } catch (error) {
        console.log('Failed to fetch')
      }
    })()
  }, [timeQuery])

  return <StatisticsCard title='Total Bookings' count={totalBookings} />
}

export default TotalBookings
