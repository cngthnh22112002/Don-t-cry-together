import React from 'react'
import "./Vehicles.css"

function CollectorVehicles() {
  return (
      <div>
        <div class="alignveh" style={{marginTop:'25px'}}>
            <div class="row">

                <div class="col-sm-6 card card-body">
                    <h5 class="card-title" align="center"><strong>Xe tải chở rác Suzuki</strong></h5>
                    <img src="https://data.thegioixetai.vn/product/suzuki/truck/xe-cho-rac/xe-cho-rac-suzuki-carry-truck-1.jpg" style={{width:'424px'}} class="w3-round" ></img>
                    <p class="card-text"></p>
                    <p class="card-text" align="center">Tải trọng: 400 kg</p>
                    <p class="card-text" align="center">Thể tích: 1.7m3</p>
                </div>

                <div class="col-sm-6 card card-body">
                    <h5 class="card-title" align="center"><strong>Xe tải chở rác Jac</strong></h5>
                    <img src="https://otophuman.vn/upload/images/xe-cho-rac-3_4-khoi-jac-x1505.jpg" style={{width:'424px'}} class="w3-round" ></img>
                    <p class="card-text"></p>
                    <p class="card-text" align="center">Tải trọng: 1375 kg</p>
                    <p class="card-text" align="center">Thể tích: 3.4m3</p>
                </div>
                
            </div>
        </div>

        

        <div class="alignveh" style={{marginTop:'25px'}}>
            <div class="row">

                <div class="col-sm-6 card card-body">
                    <h5 class="card-title" align="center"><strong>Xe tải chở rác Huyndai</strong></h5>
                    <img src="https://longbienauto.com.vn/upload/product/thumb_800x0/xe-cuon-ep-rac-hyundai-hd120-9-khoi-2-1603174863.jpg" style={{width:'424px'}} class="w3-round" ></img>
                    <p class="card-text"></p>
                    <p class="card-text" align="center">Tải trọng: 1300 kg</p>
                    <p class="card-text" align="center">Thể tích: 5m3</p>
                </div>

                <div class="col-sm-6 card card-body">
                    <h5 class="card-title" align="center"><strong>Xe tải ép rác Hino</strong></h5>
                    <img src="https://chuyendunghiephoa.com/images/stories/virtuemart/product/xe-ep-rac-15-khoi-hino-fg8jj7a-cang-gap_4.jpg" style={{width:'424px'}} class="w3-round" ></img>
                    <p class="card-text"></p>
                    <p class="card-text" align="center">Tải trọng: 6000 kg</p>
                    <p class="card-text" align="center">Thể tích: 15m3</p>
                </div>

            </div>
        </div>
    </div>
  )
}

export default CollectorVehicles