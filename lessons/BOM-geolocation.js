const status = document.body.appendChild(document.createElement('p'))

if (!navigator.geolocation)
  status.textContent = 'Geolocation is not supported by your browser'
else {
  status.textContent = 'Locating…'

  navigator.geolocation.getCurrentPosition((position) => {
      const coord = [position.coords.latitude, position.coords.longitude]
      status.textContent = `https://www.openstreetmap.org/#map=40/${coord[0]}/${coord[1]}`
      window.open(`https://www.openstreetmap.org/#map=40/${coord[0]}/${coord[1]}`, '_blank')
    }, () => (status.textContent = 'Unable to retrieve your location'))
}
