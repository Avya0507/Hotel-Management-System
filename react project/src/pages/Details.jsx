import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../App.css";

function Details() {
  const [rooms, setRooms] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const roomRes = await axios.get("http://localhost:5000/api/rooms");
      const customerRes = await axios.get("http://localhost:5000/api/customers");

      setRooms(roomRes.data);
      setCustomers(customerRes.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="details-wrapper">

        {/* ROOM CONTAINER */}
        <div className="details-container">
          <h2>Room Details</h2>

          {rooms.length === 0 ? (
            <p>No Rooms Available</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Room No</th>
                  <th>Customer</th>     
                  <th>Room Type</th>
                  <th>Booking Date</th>  
                  <th>Booking Id</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {rooms.map(r => (
                  <tr key={r._id}>
                    <td>{r.roomNo}</td>

                    {/* CUSTOMER NAME */}
                    <td>{r.customerName || "-"}</td>

                    <td>{r.roomType}</td>

                    {/*  BOOKING DATE */}
                    <td>
                      {r.bookingDate
                        ? new Date(r.bookingDate).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>{r.bookingId || "-"}</td>

                    <td
                      style={{
                        color:
                          r.status?.toLowerCase() === "booked"
                            ? "red"
                            : "lightgreen",
                        fontWeight: "bold"
                      }}
                    >
                      {r.status || "Available"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* CUSTOMER CONTAINER */}
        <div className="details-container">
          <h2>Customer Details</h2>

          {customers.length === 0 ? (
            <p>No Customers Found</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Address</th>
                </tr>
              </thead>

              <tbody>
                {customers.map(c => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>{c.mobile}</td>
                    <td>{c.email}</td>
                    <td>{c.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}

export default Details;