import { FC, ReactNode} from 'react'
import { Row, Col } from 'antd'
import CollapseWrapperStyles from './styles'

interface Props {
  leftComponent: ReactNode
  rightComponent: ReactNode
  leftSpan: number
  rightSpan: number
}

const CollapseWrapper: FC<Props> = ({
  leftComponent,
  rightComponent,
  leftSpan,
  rightSpan,
}) => {
  
  return (
    <CollapseWrapperStyles>
      <Row gutter={20} className='row-collapsed-detail' wrap={false}>
        <Col
          xl={leftSpan}
          lg={leftSpan}
          md={24}
          xs={24}
          className={`col-info}`}
        >
          {leftComponent}
        </Col>

        <Col
          xl={rightSpan}
          lg={rightSpan}
          md={24}
          xs={24}
          className='col-right'
        >
          {rightComponent}
        </Col>
      </Row>
      
    </CollapseWrapperStyles>
  )
}

export default CollapseWrapper
