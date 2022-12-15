import React from 'react'
import CollectorVehicles from './CollectorVehicles'
import JanitorVehicles from './JanitorVehicles'

function Vehicles() {
  const {role} = JSON.parse(localStorage.getItem('profile'))

  return (
      <div class="veh_bg">
        <h1 align="center">Vehicles list</h1>
        {role != 'collector' &&  <JanitorVehicles /> }
        {role != 'janitor' &&  <CollectorVehicles /> }
      </div>
  )
}

export default Vehicles