import { Navbar} from "../src/components";

const performance = () => {
  return (
    <div>
      <Navbar />

      <div style={{ backgroundColor: '#3498db', width: '200px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid'}}>
        <a href="/individual_performance">One Month Score</a>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '20px' }}>
        <button style={{ backgroundColor: '#3498db', width: '150px', height: '150px', borderRadius: '10px', border: 'none', cursor: 'pointer', marginBottom: '10px' }}>Member 1</button>
        <button style={{ backgroundColor: '#3498db', width: '150px', height: '150px', borderRadius: '10px', border: 'none', cursor: 'pointer', marginBottom: '10px' }}>Member 2</button>
        <button style={{ backgroundColor: '#3498db', width: '150px', height: '150px', borderRadius: '10px', border: 'none', cursor: 'pointer', marginBottom: '10px' }}>Member 3</button>
        <button style={{ backgroundColor: '#3498db', width: '150px', height: '150px', borderRadius: '10px', border: 'none', cursor: 'pointer', marginBottom: '10px' }}>Member 4</button>
      </div>


      <div style={{ flex: 3, backgroundColor: '#fff', padding: '2rem' }}>
      


        <div style={{ position: 'absolute', top: '150px', left: '200px'}}>
                <h1>Member 1</h1>
                <h4>Avg Score: 81</h4>
        </div>


      
        <div style={{ position: 'absolute', top: '400px', left: '200px'}}>
        <h3>Score History</h3> 
        <p>Top 3 Scores:</p>
        </div>
        
        </div>
        <div style={{ position: 'absolute', top: '470px', left: '200px'}}>
        <p>08/21/23: 100</p>
        </div>

        <div style={{ position: 'absolute', top: '490px', left: '200px'}}>
        <p>08/27/23: 89</p>
        </div>

        <div style={{ position: 'absolute', top: '510px', left: '200px'}}>
        <p>08/06/23: 87</p>
        <p>Lowest 3 Scores:</p>
        </div>

        <div style={{ position: 'absolute', top: '570px', left: '200px'}}>
        <p>08/28/23: 79</p>
        </div>

        <div style={{ position: 'absolute', top: '590px', left: '200px'}}>
        <p>08/01/23: 78</p>
        </div>

        <div style={{ position: 'absolute', top: '610px', left: '200px'}}>
            <p>08/17/23: 69</p>
        </div>
        
        

        <div style={{ position: 'absolute', top: '400px', left: '1100px'}}>
        <h3>Trend Data:</h3> 
        </div>
        
        <div style={{ position: 'absolute', bottom: '70px', right: '85px' }}>
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

        <div style={{ position: 'absolute', bottom: '50px', right: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <img src="https://quomodocumque.files.wordpress.com/2013/07/stacksgraph_inversesquare.png" style={{ width: '50%', height: 'auto' }} />
    </div>



    
    </div>


    
  );
};

export default performance;
