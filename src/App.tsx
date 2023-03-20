import React, { useEffect, useRef, useState } from 'react'
import './styles/App.css'
import { Tour, Guide, Tourist } from './Types'
import { Form } from './Form'
import { addNewTourist, deleteTourist, getTours, getTourists, getGuides } from './api/fetch'
import { GalleryList } from './lists/GalleryList'

function App() {
  const [error, setError] = useState('')
  const [state, setState] = useState<Tour[]>([])
  const [filterValue, setFilterValue] = useState('all')

  useEffect(() => {
    const fetchData = async () => {
      const toursData = getTours()
      const guidesData = getGuides()
      const touristsData = getTourists()
      await Promise.all([toursData, guidesData, touristsData]).then((data) => {
        const tour = data[0].data.bootcamps
        const guides = data[1].data.instructors
        const tourists = data[2].data.developers

        const array: Tour[] = []
        tour.map((tour: Tour) => {
          const data = {
            id: tour.id,
            tour: tour.tour,
            guides: [],
            tourists: [],
          }
          array.push(data)
        })

        tour.map((tour: Tour, index: number) => {
          guides.map((guide: Guide) => {
            if (tour.id === guide.tourId) {
              array[index].guides?.push(guide)
            }
          })
          tourists.map((tourist: Tourist) => {
            if (tour.id === tourist.tourId) {
              array[index].tourists?.push(tourist)
            }
          })
        })
        setState(array)
      })
    }
    fetchData()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setError('')
    }, 3000)
    return () => clearTimeout(timer)
  }, [error])

  const filterTour = useRef<HTMLSelectElement>(null)
  const handleFilter = () => {
    if (filterTour.current) {
      setFilterValue(filterTour.current.value)
    }
  }

  const addTourist = async (data: { fname: string; lname: string; tour: string }) => {
    const { fname, lname, tour } = data
    const tourIndex = state.findIndex((element) => element.tour === tour)
    const tourId = state[tourIndex].id

    const newTourist = await addNewTourist(fname, lname, tourId)
    setState((prevState) => {
      let nextState = [...prevState]
      nextState[tourIndex].tourists!.push(newTourist)
      return nextState
    })
    return newTourist
  }

  const removeTourist = (event: any) => {
    event.stopPropagation()
    const touristInfo = event.target.value.split(',')
    const touristId = touristInfo[0]
    const tourId = touristInfo[1]

    const tourIndex = state.findIndex((tour: Tour) => tour.id === tourId)
    const touristIndex = state[tourIndex].tourists!.findIndex(
      (tourist: Tourist) => tourist.id === touristId,
    )
    deleteTourist(touristId)
    setState((prevState) => {
      let nextState = [...prevState]
      nextState[tourIndex].tourists?.splice(touristIndex, 1)
      return nextState
    })
  }

  const changeStatus = (event: any) => {
    const deleteButton = event.target.querySelector('button')
    if (deleteButton.classList.contains('card__deletebtn--hidden')) {
      deleteButton.classList.replace('card__deletebtn--hidden', 'card__deletebtn')
    } else {
      deleteButton.classList.replace('card__deletebtn', 'card__deletebtn--hidden')
    }
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    const form = event.target
    const fname = form.elements.fname.value
    const lname = form.elements.lname.value
    const tour = form.elements.tour.value

    if (!fname || !lname) {
      setError('First name and last name are required!')
      return
    }
    try {
      const results = await addTourist({ fname, lname, tour })
      if (results) {
        form.reset()
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="App">
      <Form error={error} handleSubmit={handleSubmit} />
      <main className="main-box">
        <div>
          <h1 className="gallery__title">Active Tours</h1>
        </div>
        <label className="filter__label">Filter by Tour:</label>

        <select className="selectBootcamp" ref={filterTour} onChange={handleFilter}>
          <option value="all">all tours</option>
          <option value="jsfs">Golden Circle Full-Day Tour</option>
          <option value="jfs">Ice Cave Tour and Glacier Hike</option>
          <option value="dnfs">South of Iceland Full-Day Trip</option>
        </select>

        <GalleryList
          tours={state}
          filterValue={filterValue}
          removeTourist={removeTourist}
          changeStatus={changeStatus}
        />
      </main>
      <img className="background__image" src="iceland2.jpeg" alt=""></img>
    </div>
  )
}

export default App