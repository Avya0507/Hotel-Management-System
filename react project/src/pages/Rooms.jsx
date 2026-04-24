import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [roomStatusMsg, setRoomStatusMsg] = useState("");
  const [isMultiple, setIsMultiple] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    roomNo: "",
    roomType: "",
    price: "",
    tax: "",
    dinner: "",
    total: "",
    bookingDate: "",
    status: "Available",
    bookingId: Math.floor(Math.random() * 10000),
  });

  const [multiRooms, setMultiRooms] = useState([
    {
      customerName: "",
      roomNo: "",
      roomType: "",
      price: "",
      tax: "",
      dinner: "",
    },
  ]);

  const fetchRooms = async () => {
    const res = await axios.get("https://hotel-management-system-2mqi.onrender.com/api/rooms");
    setRooms(res.data);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const isLastRoomFilled = () => {
    const lastRoom = multiRooms[multiRooms.length - 1];

    return (
      lastRoom.customerName &&
      lastRoom.roomNo &&
      lastRoom.roomType &&
      lastRoom.price &&
      lastRoom.tax &&
      lastRoom.dinner !== ""
    );
  };

  // SINGLE TOTAL
  const calculateSingleTotal = () => {
    const total =
      Number(form.price || 0) +
      Number(form.tax || 0) +
      Number(form.dinner || 0);

    setForm({ ...form, total });
  };

  // CHECK ROOM
  const checkSingleRoom = (value) => {
    setForm({ ...form, roomNo: value });

    const existingRoom = rooms.find(
      (r) => String(r.roomNo) === String(value)
    );

    if (existingRoom && existingRoom.status === "Booked") {
      setRoomStatusMsg("❌ Room already booked");
    } else {
      setRoomStatusMsg("Room available");
    }
  };

  // MULTI CHANGE
  const handleMultiChange = (index, field, value) => {
    const updated = [...multiRooms];
    updated[index][field] = value;
    setMultiRooms(updated);
    validateMultiple(updated);
  };

  const addRoomField = () => {
    setMultiRooms([
      ...multiRooms,
      {
        customerName: "",
        roomNo: "",
        roomType: "",
        price: "",
        tax: "",
        dinner: "",
      },
    ]);
  };

  const validateMultiple = (updatedRooms) => {
    const roomNos = updatedRooms.map((r) => r.roomNo).filter(Boolean);

    if (new Set(roomNos).size !== roomNos.length) {
      setRoomStatusMsg("❌ Duplicate room numbers");
      return;
    }

    for (let r of updatedRooms) {
      const existingRoom = rooms.find(
        (room) => String(room.roomNo) === String(r.roomNo)
      );

      if (existingRoom && existingRoom.status === "Booked") {
        setRoomStatusMsg("❌ Some rooms already booked");
        return;
      }
    }

    setRoomStatusMsg("All rooms available");
  };

  // BOOK ROOM
  const addRoom = async () => {
    if (!form.bookingDate) {
      alert("Select booking date");
      return;
    }

    try {
      if (isMultiple) {
        for (let r of multiRooms) {
          if (!r.customerName || !r.roomNo || !r.roomType) {
            alert("Fill all fields");
            return;
          }

          const existingRoom = rooms.find(
            (room) => String(room.roomNo) === String(r.roomNo)
          );

          if (existingRoom && existingRoom.status === "Booked") {
            alert(`Room ${r.roomNo} already booked`);
            return;
          }

          const total =
            Number(r.price || 0) +
            Number(r.tax || 0) +
            Number(r.dinner || 0);

          const data = {
            customerName: r.customerName,
            roomNo: r.roomNo,
            roomType: r.roomType,
            price: Number(r.price),
            tax: Number(r.tax),
            dinner: Number(r.dinner),
            total,
            bookingDate: form.bookingDate,
            status: "Booked",
            bookingId: Math.floor(Math.random() * 10000),
          };

          await axios.post("https://hotel-management-system-2mqi.onrender.com/api/rooms", data);
        }

        alert("Multiple Rooms Booked Successfully!");
      } else {
        if (!form.customerName || !form.roomNo || !form.roomType) {
          alert("Fill all fields");
          return;
        }

        const existingRoom = rooms.find(
          (r) => String(r.roomNo) === String(form.roomNo)
        );

        if (existingRoom && existingRoom.status === "Booked") {
          alert("Room already booked");
          return;
        }

        const data = {
          ...form,
          price: Number(form.price),
          tax: Number(form.tax),
          dinner: Number(form.dinner),
          total:
            Number(form.price || 0) +
            Number(form.tax || 0) +
            Number(form.dinner || 0),
          status: "Booked",
        };

        await axios.post("https://hotel-management-system-2mqi.onrender.com/api/rooms", data);
        alert("Room Booked Successfully!");
      }

      // RESET FORM
      setForm({
        customerName: "",
        roomNo: "",
        roomType: "",
        price: "",
        tax: "",
        dinner: "",
        total: "",
        bookingDate: "",
        status: "Available",
        bookingId: Math.floor(Math.random() * 10000),
      });

      setMultiRooms([
        {
          customerName: "",
          roomNo: "",
          roomType: "",
          price: "",
          tax: "",
          dinner: "",
        },
      ]);

      setRoomStatusMsg("");
      setIsMultiple(false);
      fetchRooms();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="room-header">
          <h2>Room Booking</h2>

          <div className="toggle-below">
            <span>Single</span>
            <span>Multiple</span>
            <input
              type="checkbox"
              checked={isMultiple}
              onChange={() => {
                setIsMultiple(!isMultiple);
                setRoomStatusMsg("");
              }}
            />
          </div>
        </div>

        {/* SINGLE */}
        {!isMultiple && (
          <>
            <input
              placeholder="Customer Name"
              value={form.customerName}
              onChange={(e) =>
                setForm({ ...form, customerName: e.target.value })
              }
            />

            <input
              placeholder="Room No"
              value={form.roomNo}
              onChange={(e) => checkSingleRoom(e.target.value)}
            />

            <select
              value={form.roomType}
              onChange={(e) =>
                setForm({ ...form, roomType: e.target.value })
              }
            >
              <option value="">Select Room Type</option>
              <option>Single</option>
              <option>Double</option>
              <option>Deluxe</option>
              <option>Suite</option>
            </select>

            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Tax"
              value={form.tax}
              onChange={(e) =>
                setForm({ ...form, tax: e.target.value })
              }
            />

            <select
              value={form.dinner}
              onChange={(e) =>
                setForm({ ...form, dinner: e.target.value })
              }
            >
              <option value="">Dinner Plan</option>
              <option value="0">No Dinner</option>
              <option value="200">Standard</option>
              <option value="500">Premium</option>
            </select>

            <button onClick={calculateSingleTotal}>Calculate Total</button>
            <h3>Total: ₹{form.total}</h3>
          </>
        )}

        {/* MULTIPLE */}
        {isMultiple &&
          multiRooms.map((room, index) => (
            <div key={index} className="multi-room">
              <input
                placeholder="Customer Name"
                value={room.customerName}
                onChange={(e) =>
                  handleMultiChange(index, "customerName", e.target.value)
                }
              />

              <input
                placeholder="Room No"
                value={room.roomNo}
                onChange={(e) =>
                  handleMultiChange(index, "roomNo", e.target.value)
                }
              />

              <select
                value={room.roomType}
                onChange={(e) =>
                  handleMultiChange(index, "roomType", e.target.value)
                }
              >
                <option value="">Room Type</option>
                <option>Single</option>
                <option>Double</option>
                <option>Deluxe</option>
                <option>Suite</option>
              </select>

              <input
                type="number"
                placeholder="Price"
                value={room.price}
                onChange={(e) =>
                  handleMultiChange(index, "price", e.target.value)
                }
              />

              <input
                type="number"
                placeholder="Tax"
                value={room.tax}
                onChange={(e) =>
                  handleMultiChange(index, "tax", e.target.value)
                }
              />

              <select
                value={room.dinner}
                onChange={(e) =>
                  handleMultiChange(index, "dinner", e.target.value)
                }
              >
                <option value="">Dinner</option>
                <option value="0">No</option>
                <option value="200">Standard</option>
                <option value="500">Premium</option>
              </select>

              <p>
                Total: ₹
                {Number(room.price || 0) +
                  Number(room.tax || 0) +
                  Number(room.dinner || 0)}
              </p>
            </div>
          ))}

        {isMultiple && (
          <button onClick={addRoomField} disabled={!isLastRoomFilled()}>
            + Add More
          </button>
        )}

        <p style={{ color: roomStatusMsg.includes("❌") ? "red" : "green" }}>
          {roomStatusMsg}
        </p>

        <input
          type="date"
          value={form.bookingDate}
          onChange={(e) =>
            setForm({ ...form, bookingDate: e.target.value })
          }
        />

        <button onClick={addRoom} disabled={roomStatusMsg.includes("❌")}>
          Book Room
        </button>
      </div>
    </div>
  );
}

export default Rooms;