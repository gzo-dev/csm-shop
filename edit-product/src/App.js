import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Edit from './screen/EditTour'
import SocketContainer from './SocketContainer/SocketContainer'
import EditTicket from './screen/EditTicket'
import EditBlog from './screen/EditBlog'
import EditProduct from './screen/EditProduct'
import NewProduct from './screen/AddProduct'
import NewTicket from './screen/AddTicket'
import NewTour from './screen/AddTour'
import NewBlog from './screen/AddBlog'
import { API_URL } from './config'
import LoadingScreen from './screen/LoadingScreen'

const App = () => {
  return (
    <SocketContainer serverUrl={API_URL}>
      <BrowserRouter>
        <Routes>
          <Route path="/edit-product/:id/:subid/:uid/:roomId/:page/:search" element={<EditProduct />} />
          <Route path="/edit-product/:id/:subid/:uid/:roomId/:page" element={<EditProduct />} />
          <Route path="/edit-tour/:uid/:roomId" element={<Edit />} />
          <Route path="/edit-ticket/:id/:uid/:roomId" element={<EditTicket />} />
          <Route path="/edit-blog/:id/:uid/:roomId" element={<EditBlog />} />
          {/*  */}
          <Route path="/add-product/:id/:subid/:roomId" element={<NewProduct />} />
          <Route path="/add-ticket/:id/:roomId" element={<NewTicket />} />
          <Route path="/add-tour/:id/:roomId" element={<NewTour />} />
          <Route path="/add-blog/:id/:uid/:roomId" element={<NewBlog />} />
          <Route path="/loading" element={<LoadingScreen />} />

        </Routes>
      </BrowserRouter>
    </SocketContainer>
  )
}

export default App
