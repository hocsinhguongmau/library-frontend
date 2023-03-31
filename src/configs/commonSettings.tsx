import { SlArrowRight, SlArrowLeft } from 'react-icons/sl'

export const bannerSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoPlay: true
}

export const paginationSettings = {
  pageRangeDisplayed: 3,
  marginPagesDisplayed: 2,
  renderOnZeroPageCount: () => null,
  previousLabel: <SlArrowLeft className="text-xl" />,
  nextLabel: <SlArrowRight className="text-xl" />
}
