import Checkboxes from "../src/components/performance/checkBox";
import { Navbar} from "../src/components";

const report_performance = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Navbar />
      <h1>Team Member 1</h1>
      <h2 style={{marginTop:"-30px"}}>08/21/2022</h2>
      <h3 style={{marginTop:"-25px"}}>Score: 93%</h3>
      

      <div style = {{ display: "flex", justifyContent: "center"}}>
      <div style={{ position: 'absolute', top: '170px'}}>
        <p>7:00 am  Bathroom #0001</p>
        </div>

        <div style={{ position: 'absolute', top: '190px'}}>
        <p>Building A Floor 1 </p>
        </div>
      
      </div>

      <hr style={{marginTop: "35px"}}/>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ marginRight: "20px" }}>
          <div>Toilet</div>
          <Checkboxes />
        </div>
        <div style={{ marginRight: "20px" }}>
          <div>Sink</div>
          <Checkboxes />
        </div>
        <div style={{ marginRight: "20px" }}>
          <div>Restock</div>
          <Checkboxes />
        </div>
        <div>
          <div>Grab bar</div>
          <Checkboxes />
        </div>
      </div>
      <hr />

    </div>
  );
};

export default report_performance;

