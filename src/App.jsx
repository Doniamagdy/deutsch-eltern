
import { Route , Routes } from 'react-router-dom'
import './App.css'
import Layout from './shared/components/layout/Layout'
import Home from './components/Home/Home'
import Hase from './components/Hase/Hase'
function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
         <Route path="/wo-ist-mein-hase" element={<Hase />} />
      </Route>
    </Routes>
  )
}

export default App
