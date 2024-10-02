import { useState ,useEffect} from 'react'
import Navbar from './Components/Header.jsx' 
import Todos from './Components/api.jsx'

import './App.css'

function App() {
  const [selectedGrouping, setSelectedGrouping] = useState('user');
  const[sortBy,setSortBy]=useState('priority');
  console.log(sortBy)

  return (
    <>
      <div>
         <Navbar sortBy={sortBy} setSortBy={setSortBy} selectedGrouping={selectedGrouping} setSelectedGrouping={setSelectedGrouping}/>
         <Todos sortBy={sortBy} setSortBy={setSortBy} selectedGrouping={selectedGrouping} setSelectedGrouping={setSelectedGrouping}/>
      </div>
    </>
  )
}

export default App