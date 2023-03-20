import { FC } from 'react'
import { Tour, Tourist, Guide } from '../Types'

type PersonListProps = {
  tour: Tour
  removeTourist: (event: any) => void
  changeStatus: (event: any) => void
}

export const PersonList: FC<PersonListProps> = ({ tour, removeTourist, changeStatus }) => {
  const { tourists, guides } = tour
  return (
    <>
      <div key={tour.id}>
        <p key={tour.id} className="card__title">
          Tour guides:
        </p>
        {guides &&
          guides.map((guide: Guide) => {
            return (
              <div key={guide.id} className="card__instructor-box">
                <p className="card__name">{guide.name}</p>
              </div>
            )
          })}
      </div>
      <div className="cardList --dev">
        <p className="card__title">Tourists:</p>
        <div className="card__grid">
          {tourists &&
            tourists.map((tourist: Tourist) => {
              const touristInfo = [tourist.id, tourist.tourId]
              return (
                <div
                  key={tourist.id}
                  className="toggled card card__developer-box"
                  onClick={changeStatus}
                >
                  <p className="card__name">{tourist.name}</p>
                  <button
                    className="deleteBtn card__deletebtn--hidden"
                    key={tourist.id}
                    value={touristInfo}
                    onClick={removeTourist}
                  >
                    Delete
                  </button>
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}
