import { useState, useEffect } from 'react'
import WikiWrapper from './WikiWrapper'
import './Game.css'
import WinDialog from './WinDialog'

async function getTitleOfRandomWikipediaPage() {
  console.log("pulling random page");
  const response = await fetch('https://en.wikipedia.org/api/rest_v1/page/random/title');
  const json = await response.text();
  const responseObject = JSON.parse(json);
  return responseObject.items[0].title;
}

function Game() {
  const [linksClicked, setLinksClicked] = useState(0);
  const [target, setTarget] = useState("Philosophy");
  const [start, setStart] = useState("");
  const [currentPageTitle, setCurrentPageTitle] = useState("");
  const [isWinDialogOpen, setIsWinDialogOpen] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getTitleOfRandomWikipediaPage().then((title) => {
      setStart(title);
      setCurrentPageTitle(title);
    });
  }, []);

  useEffect(() => {
    setHistory((prev) => [...prev, currentPageTitle]);
    if(currentPageTitle == target) {
      showWinDialog();
    }
  }, [currentPageTitle])

  const navigateToFunction = (linkContent) => {
    console.log(linkContent);
    setCurrentPageTitle(linkContent);
    setLinksClicked(linksClicked + 1);
  };

  const resetGame = () => {
    setHistory([]);
    getTitleOfRandomWikipediaPage().then((title) => {
      setStart(title);
      setCurrentPageTitle(title);
    });
  };


  const showWinDialog = () => {
    setIsWinDialogOpen(true);
  };

  const closeWinDialog = () => {
    setIsWinDialogOpen(false);
    resetGame();
  };

  return (
    <>
      {isWinDialogOpen && (
      <WinDialog start={start} end={target} numSteps={linksClicked} history={history} closeFunction={closeWinDialog} />
      )}
      <div className='gameStatusBar'>
        <span className='gameStatusBarSpan'><b>Start: </b>{start}</span>
        <span className='gameStatusBarSpan'><b>Current: </b>{currentPageTitle}</span>
        <span className='gameStatusBarSpan'><b>Target: </b>{target}</span>
        <span className='gameStatusBarSpan'><b>Score: </b>{linksClicked}</span>
        <hr></hr>
      </div>
      <WikiWrapper title={currentPageTitle} navigateToFunction={navigateToFunction}/>
    </>
  )
}

export default Game
