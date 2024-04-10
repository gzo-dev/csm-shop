import React from 'react'
import { useHistory } from 'react-router-dom'

const View = () => {
  const history= useHistory()
  const handleClick= (path)=> {
    history.push(path)
  }

  return (
    <div className="container-view-realestate" style={{width: '100%',}}>
      <div style={{width: '100%'}} className='d-flex justify-content-center align-items-center'>
        <div>
          <div style={{display: "flex", justifyContent: "space-between", gap: 50}}>
            <div onClick={()=> {
              handleClick("/admin/tk/1/list")
            }} className='d-flex justify-content-center align-items-center' style={{padding: "20px 0px", background: "#fff", borderRadius: 10, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", width: 350, cursor: "pointer"}}>
              <div style={{color: "#F37335", fontSize: 24, fontWeight: 600, textAlign: "center", textTransform: "uppercase"}}>
                Vé tham quan miền bắc
              </div>
            </div>
            <div onClick={()=> {
              handleClick("/admin/tk/2/list")
            }} className='d-flex justify-content-center align-items-center' style={{padding: "20px 0px", background: "#fff", borderRadius: 10, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", width: 350, cursor: "pointer"}}>
              <div style={{color: "#F37335", fontSize: 24, fontWeight: 600, textAlign: "center", textTransform: "uppercase"}}>
                Vé tham quan miền trung
              </div>
            </div>
          </div>
          <div onClick={()=> {
              handleClick("/admin/tk/3/list")
            }} style={{display: "flex", justifyContent: "space-between", gap: 50, marginTop: 50}}>
            <div className='d-flex justify-content-center align-items-center' style={{padding: "20px 0px", background: "#fff", borderRadius: 10, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", width: 350, cursor: "pointer"}}>
              <div style={{color: "#F37335", fontSize: 24, fontWeight: 600, textAlign: "center", textTransform: "uppercase"}}>
                Vé tham quan miền nam
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default View
