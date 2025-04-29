import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';

const App = () => {
  return (
      // <h1 className=' bg-amber-500 text-shadow-indigo-600'> YouTube Clone  </h1>
    <Router>
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {/* <main className="container mx-auto py-8 px-4">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </main> 
      <Footer /> */}
    </div>
  </Router>
  )
}

export default App

// import { Provider } from "react-redux"
// import store from "./redux/store"

//     <Provider store={store}>
      
//     </Provider>
