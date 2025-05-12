import Form from "./components/Form"
import Search from "./components/Search"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Form/>} />
        <Route path='/search' element={<Search/>} />
      </Routes>
    </Router>
  )
}

export default App
