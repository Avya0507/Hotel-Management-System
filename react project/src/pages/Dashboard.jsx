// function Dashboard() {
//   return (
//     <div>
//       <h1>Hotel Management Dashboard</h1>
//       <a href="/customers">Customers</a>
//       <a href="/rooms">Rooms</a>
//     </div>
//   );
// }

// export default Dashboard;
// import Navbar from "../components/Navbar";
// import "../App.css";

// function Dashboard() {
//   return (
//     <div>
//       <Navbar />

//       <h1 style={{ textAlign: "center", color: "white" }}>
//         Welcome to Hotel Management System
//       </h1>

//       <div style={{ display: "flex", justifyContent: "center", gap: "30px", marginTop: "50px" }}>

//         <div style={{ background: "white", padding: "20px", borderRadius: "10px" }}>
//           <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2" width="200" />
//           <h3>Rooms</h3>
//         </div>

//         <div style={{ background: "white", padding: "20px", borderRadius: "10px" }}>
//           <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267" width="200" />
//           <h3>Customers</h3>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Dashboard;
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />

      <h1 className="title">Welcome to Hotel Management</h1>

      <div className="card-container">

        <div className="card" onClick={() => navigate("/rooms")}>
          <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2" />
          <h2>Rooms</h2>
        </div>

        <div className="card" onClick={() => navigate("/customers")}>
          <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267" />
          <h2>Customers</h2>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;