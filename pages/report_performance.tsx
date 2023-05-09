import Checkboxes from "../src/components/performance/checkBox";
import { Navbar} from "../src/components";

const report_performance = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Navbar />
      <h1>Team Member 1</h1>
      <h2>08/21/2022</h2>
      <h3>Score: 93%</h3>
      <hr />

      <div style={{ position: 'absolute', top: '200px', left: '100px'}}>
        <p>7:00 am  Bathroom #0001</p>
        </div>

        <div style={{ position: 'absolute', top: '220px', left: '100px'}}>
        <p>Building A Floor 1 </p>
        </div>

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

