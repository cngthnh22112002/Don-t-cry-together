import React from 'react'
import "./Vehicles.css"

function JanitorVehicles() {
  return (
      <div>
        <div class="alignveh" style={{marginTop:'25px'}}>
            <div class="row">

                <div class="col-sm-6 card card-body">
                    <h5 class="card-title" align="center"><strong>Thùng rác HDPE 240L</strong></h5>
                    <img src="http://encoplastic.vn/upload/product/thung-rac-nhua-hdpe-240l-ma-san-pham-db-240lh-70.png" style={{width:'424px'}} class="w3-round" ></img>
                    <p class="card-text"></p>
                    <p class="card-text" align="center">Tải trọng: 80kg</p>
                    <p class="card-text" align="center">Thể tích: 240l</p>
                </div>

                <div class="col-sm-6 card card-body">
                    <h5 class="card-title" align="center"><strong>Thùng rác HDPE 660L</strong></h5>
                    <img src="http://encoplastic.vn/upload/product/thung-rac-nhua-hdpe-660l-3925.png" style={{width:'424px'}} class="w3-round" ></img>
                    <p class="card-text"></p>
                    <p class="card-text" align="center">Tải trọng: 150kg</p>
                    <p class="card-text" align="center">Thể tích: 660l</p>
                </div>

               
                
            </div>
        </div>

    </div>
  )
}

export default JanitorVehicles