export function setItem (data) {
  const website = JSON.parse(localStorage.getItem('website')) || []
  website.push(data)
  localStorage.setItem('website', JSON.stringify(website))
}

export const getItem = () => {
  const data = JSON.parse(window.localStorage.getItem('website'))
  return data
}

export const removeItem = (index) => {
  const data = JSON.parse(window.localStorage.getItem('website'))
  data.splice(index, 1)
  localStorage.setItem('website', JSON.stringify(data))
}
