export type Tour = {
  id: string
  tour: string
  guides?: Guide[]
  tourists?: Tourist[]
}

export type Guide = {
  id: string
  name: string
  favouriteColour: string
  tourId: string
}

export type Tourist = {
  id: string
  name: string
  tourId: string
}
