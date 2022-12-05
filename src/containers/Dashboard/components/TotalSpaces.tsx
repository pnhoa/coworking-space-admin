import statisticsApi from 'api/statisticsApi'
import StatisticsCard from 'components/common/StatisticsCard'
import { ReportParams } from 'interfaces'
import { useEffect, useState } from 'react'

interface Props {
  timeQuery?: ReportParams
}

const TotalSpaces = ({ timeQuery }: Props) => {
  const [totalSpaces, setTotalSpaces] = useState(0)

  useEffect(() => {
    ;(async () => {
      try {
        const count = await statisticsApi.getTotalSpaces(timeQuery)
        setTotalSpaces(count)
      } catch (error) {
        console.log('Failed to fetch', error)
      }
    })()
  }, [timeQuery])

  return <StatisticsCard title='Total Active Spaces' count={totalSpaces} />
}

export default TotalSpaces
