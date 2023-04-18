import { useState } from 'react';

const members_performance = () => {
  const [activeButton, setActiveButton] = useState('');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
      
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, backgroundColor: '#ccc', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <button style={{ width: '100%', height: '25%', fontSize: '2rem', margin: '1rem 0',  backgroundColor: activeButton === 'Member 1' ? '#fff' : '#ccc', outline: activeButton === 'Member 1' ? '2px solid black' : 'none' }} onClick={() => handleButtonClick('Member 1')}>Member 1</button>
        <button style={{ width: '100%', height: '25%', fontSize: '2rem', margin: '1rem 0',  backgroundColor: activeButton === 'Member 2' ? '#fff' : '#ccc', outline: activeButton === 'Member 2' ? '2px solid black' : 'none' }} onClick={() => handleButtonClick('Member 2')}>Member 2</button>
        <button style={{ width: '100%', height: '25%', fontSize: '2rem', margin: '1rem 0',  backgroundColor: activeButton === 'Member 3' ? '#fff' : '#ccc', outline: activeButton === 'Member 3' ? '2px solid black' : 'none' }} onClick={() => handleButtonClick('Member 3')}>Member 3</button>
        <button style={{ width: '100%', height: '25%', fontSize: '2rem', margin: '1rem 0',  backgroundColor: activeButton === 'Member 4' ? '#fff' : '#ccc', outline: activeButton === 'Member 4' ? '2px solid black' : 'none' }} onClick={() => handleButtonClick('Member 4')}>Member 4</button>
      </div>
    
      <div style={{ flex: 3, backgroundColor: '#fff', padding: '2rem' }}>
        <h1>Member 1</h1>
        <h4>Avg Score: 81</h4>
      
        <div style={{ position: 'absolute', top: '400px', left: '400px'}}>
        <h3>Score History</h3> 
        <p>Top 3 Scores:</p>
        </div>
        
        </div>
        <div style={{ position: 'absolute', top: '470px', left: '400px'}}>
        <p>08/21/23: 100</p>
        </div>

        <div style={{ position: 'absolute', top: '490px', left: '400px'}}>
        <p>08/27/23: 89</p>
        </div>

        <div style={{ position: 'absolute', top: '510px', left: '400px'}}>
        <p>08/06/23: 87</p>
        <p>Lowest 3 Scores:</p>
        </div>

        <div style={{ position: 'absolute', top: '570px', left: '400px'}}>
        <p>08/28/23: 79</p>
        </div>

        <div style={{ position: 'absolute', top: '590px', left: '400px'}}>
        <p>08/01/23: 78</p>
        </div>

        <div style={{ position: 'absolute', top: '610px', left: '400px'}}>
            <p>08/17/23: 69</p>
        </div>
        
        <div style={{ backgroundColor: '#ccc', width: '200px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid'}}>
        <a href="/individual_performance">One Month Score</a>
        </div>
        

        <div style={{ position: 'absolute', top: '400px', left: '1100px'}}>
        <h3>Trend Data:</h3> 
        </div>
        
        <div style={{ position: 'absolute', bottom: '70px', right: '200px' }}>
        <div style={{ backgroundColor: '#fff', width: '150px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' , border: '1px solid'}}>
        <p>Floors 100%</p>
        </div>
        <div style={{ backgroundColor: '#fff', width: '150px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1px' , border: '1px solid'}}>
         <p>Restock 100%</p>
        </div>
        <div style={{ backgroundColor: '#fff', width: '150px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1px' , border: '1px solid'}}>
          <p>Couch 62%</p>
        </div>
        <div style={{ backgroundColor: '#fff', width: '150px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1px' , border: '1px solid'}}>
            <p>Bed 33%</p>
        </div>
        </div>

        <div style={{ position: 'absolute', bottom: '50px', right: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <img src="https://quomodocumque.files.wordpress.com/2013/07/stacksgraph_inversesquare.png" style={{ width: '50%', height: 'auto' }} />
    </div>



    
    </div>
  );
};
  
  
  export default members_performance;