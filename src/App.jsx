import { useState } from 'react'
import './App.css'
import Game from './Game'

function App() {
  const [count, setCount] = useState(0);
  const [currentPageTitle, setCurrentPageTitle] = useState("Codeshare_agreement");

  const navigateToFunction = (linkContent) => {
    console.log(linkContent);
    setCurrentPageTitle(linkContent);
  }

  return (
    <>
      <div>
        <Game />
      </div>
    </>
  )
}

export default App
