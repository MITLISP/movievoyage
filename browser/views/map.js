'use strict'

const html = require('choo/html')
const request = require('superagent')

module.exports = (state, emit) => {
  $(document).ready(function() { 
    console.log("RENDER")
    var map = L.map('map', {
      crs: L.CRS.Simple
    })

    console.log("MAP:", map)

    var bounds = [ [0, 0], [2666, 4000] ]
    var image = L.imageOverlay('/img/map.jpg', bounds).addTo(map)

    map.fitBounds(bounds)
  })

  const body =  html`
    <div>
      <div id="map" style="height: 100%; width:100%"> 
      </div>
    </div>
  `

  return body
}