import { FC } from 'react'
import { PersonList } from './PersonList'
import { Tour } from '../Types'

type TourListProps = {
  tour: Tour
  removeTourist: (event: any) => void
  changeStatus: (event: any) => void
}

export const TourList: FC<TourListProps> = ({
  tour,
  removeTourist,
  changeStatus,
}) => {
  return (
    <div key={tour.id} className="bootcamp">
      <h2 className="bootcamp__title">{tour.tour} </h2>
      <PersonList
        tour={tour}
        removeTourist={removeTourist}
        changeStatus={changeStatus}
      />
    </div>
  )
}
