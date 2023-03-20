import { Tour } from '../Types'
import { FC } from 'react'
import { TourList } from './TourList'


type GalleryListProps = {
  tours: Tour[];
  filterValue: string;
  removeTourist: (event: any) => void;
  changeStatus: (event: any) => void;
};

export const GalleryList: FC<GalleryListProps> = ({
  tours,
  filterValue,
  removeTourist,
  changeStatus,
}) => {
  if (filterValue === 'all') {
    return (
      <div className="gallery">
        {tours &&
          tours.map((tour: Tour) => {
            return <TourList key={tour.id} tour={tour} 
            removeTourist={removeTourist} changeStatus={changeStatus} />
          })}
      </div>
    )
  } else {
    const tourIndex = tours.findIndex(
      (tour: Tour) => tour.tour === filterValue,
    )
    const tour = tours[tourIndex]
    return <div className="gallery">{<TourList key={tour.id} 
    tour={tour} removeTourist={removeTourist} changeStatus={changeStatus} />}</div>
  }
}
