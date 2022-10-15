import { Carousel, Image as ImageAntd } from 'antd'
import { Image } from 'interfaces'
import { ReactNode, FC } from 'react'

interface Props {
  images: Image[]
  className?: string
  extraAction?: ReactNode
}

const ImageSlider: FC<Props> = ({ images, className, extraAction }) => {
  return (
    <Carousel effect="scrollx">

    <div>
      <ImageAntd
          src={ images[0].url ? images[0].url : `no-data.jpeg`}
          alt='image'
          style={{
            width: '960px',
            height: '240px',
            borderRadius: '6px',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
      />
    </div>
    <div>
      <ImageAntd
          src={ images[1].url ? images[1].url : `no-data.jpeg`}
          alt='image'
          style={{
            width: '960px',
            height: '240px',
            borderRadius: '6px',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
      />
    </div>
    <div>
      <ImageAntd
          src={ images[2].url ? images[2].url : `no-data.jpeg`}
          alt='image'
          style={{
            width: '960px',
            height: '240px',
            borderRadius: '6px',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
      />
    </div>
  </Carousel>
  )
}

export default ImageSlider
