import { cleanData, getOneData } from "../Utils/dataUtils"

export const getAccomodationGallery = async () => {
  let response = await fetch("src/data/logements.json", {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  })
  const data = await response.json()
  return cleanData(data, ["id", "title", "cover"])
}

export const getAccomodationDetails = async (id) => {
  let response = await fetch("../src/data/logements.json", {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  })
  const data = await response.json()
  return getOneData(data, id)
}