
import { Route , Routes } from 'react-router-dom'
import './App.css'
import Layout from './shared/components/layout/Layout'
import Home from './components/Home/Home'
import Hase from './components/Hase/Hase'
import Spiele from './components/Spiele/Spiele'

function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
         <Route path="/wo-ist-mein-hase" element={<Hase />} />
         <Route path="/spiele" element={<Spiele />} />
      </Route>
    </Routes>
  )
}

export default App
