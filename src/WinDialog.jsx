import './Dialog.css'

function WinDialog({start, end, numSteps, history, closeFunction}) {

    return(
        <div className='overlay'>
            <div className="dialogWindow">
                <h2>Congratulations!</h2>
                
                <span key="announcement">You made it from {start} to {end} using only {numSteps} links!</span>
                <br/>
                <div key="history">
                    <span key="yourpath"><b>Your path...</b></span>
                    {history.map((page) => (
                        <span key={page}>{page}<br/></span>
                    ))}
                </div>
                <button onClick={() => closeFunction()}>Ready to try again?</button>
            </div>
        </div>
    );
};

export default WinDialog