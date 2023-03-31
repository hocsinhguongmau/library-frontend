import Slider from 'react-slick'
import { Link } from 'react-router-dom'

import banners from '@/data/banners.json'
import { bannerSettings } from '@/configs/commonSettings'

export default function Banner() {
  return (
    <Slider {...bannerSettings} className="banner">
      {banners.map((banner) => (
        <Link to={banner.url} key={banner.id} target="_blank">
          <img
            src={banner.picture}
            alt={banner.title}
            width={586}
            height={361}
            title={banner.title}
            aria-label={banner.title}
          />
        </Link>
      ))}
    </Slider>
  )
}
