import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../App.css";

function CheckInOut() {
  const [form, setForm] = useState({
    customerName: "",
    roomNo: "",
    roomType: "",
    bookingDate: ""
  });

  const [bookings, setBookings] = useState([]);
  const [matchedRooms, setMatchedRooms] = useState([]);

  // FETCH BOOKINGS
  const fetchBookings = async () => {
    const res = await axios.get("http://localhost:5000/api/bookings");
    setBookings(res.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // 🔥 FETCH ROOMS BY CUSTOMER NAME
  const handleCustomerChange = async (value) => {
    setForm({ ...form, customerName: value });

    if (!value) {
      setMatchedRooms([]);
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/api/rooms");

      const rooms = res.data.filter(
        r =>
          r.customerName &&
          r.customerName.toLowerCase() === value.toLowerCase()
      );

      setMatchedRooms(rooms);

      if (rooms.length > 0) {
        setForm({
          customerName: value,
          roomNo: rooms[0].roomNo,
          roomType: rooms[0].roomType,
          bookingDate: rooms[0].bookingDate
        });
      }

    } catch (err) {
      console.log(err);
    }
  };

  // ✅ 🔥 FINAL VALIDATION (FIXED)
  const isAlreadyCheckedOut = (data) => {
    return bookings.some(b =>
      b.customerName?.toLowerCase() === data.customerName.toLowerCase() &&
      String(b.roomNo) === String(data.roomNo) &&
      b.status === "Checked-Out"
    );
  };

  // CHECK-IN
  const handleCheckIn = async (roomData = null) => {
    const data = roomData || form;

    if (!data.customerName || !data.roomNo) return;

    if (isAlreadyCheckedOut(data)) return;

    try {
      await axios.post("http://localhost:5000/api/bookings/checkin", {
        ...data,
        checkIn: new Date().toLocaleString(),
        status: "Checked-In"
      });

      // RESET
      setForm({
        customerName: "",
        roomNo: "",
        roomType: "",
        bookingDate: ""
      });

      setMatchedRooms([]);
      fetchBookings();

    } catch (err) {
      console.log(err);
    }
  };

  // CHECK-OUT
  const handleCheckOut = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/checkout/${id}`);
      fetchBookings();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="details-wrapper">

        {/* LEFT SIDE */}
        <div className="container">
          <h2>Check-In</h2>

          <input
            placeholder="Customer Name"
            value={form.customerName}
            onChange={e => handleCustomerChange(e.target.value)}
          />

          {/* MULTIPLE ROOMS */}
          {matchedRooms.length > 0 ? (
            matchedRooms.map((room, index) => (
              <div key={index} className="multi-room">

                <input value={room.roomNo} readOnly />
                <input value={room.roomType} readOnly />
                <input value={room.bookingDate} readOnly />

                <button
                  onClick={() => handleCheckIn(room)}
                  disabled={isAlreadyCheckedOut(room)}
                  className={isAlreadyCheckedOut(room) ? "disabled-btn" : ""}
                >
                  Check In Room {room.roomNo}
                </button>

              </div>
            ))
          ) : (
            <>
              <input value={form.roomNo} readOnly />
              <input value={form.roomType} readOnly />
              <input value={form.bookingDate} readOnly />

              <button
                onClick={() => handleCheckIn()}
                disabled={isAlreadyCheckedOut(form)}
                className={isAlreadyCheckedOut(form) ? "disabled-btn" : ""}
              >
                Check In
              </button>
            </>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="details-container">
          <h2>Check-In Details</h2>

          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Room</th>
                <th>Type</th>
                <th>Booking Date</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map(b => (
                <tr key={b._id}>
                  <td>{b.customerName}</td>
                  <td>{b.roomNo}</td>
                  <td>{b.roomType}</td>
                  <td>{b.bookingDate}</td>
                  <td>{b.checkIn}</td>
                  <td>{b.checkOut || "-"}</td>
                  <td>{b.status}</td>

                  <td>
                    {b.status === "Checked-In" && (
                      <button onClick={() => handleCheckOut(b._id)}>
                        Check Out
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}

export default CheckInOut;