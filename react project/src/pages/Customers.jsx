import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Customers() {
  const [customers, setCustomers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    nationality: "",
    gender: "",
    idProof: "",
    idNumber: ""
  });

  const fetchCustomers = async () => {
    const res = await axios.get("http://localhost:5000/api/customers");
    setCustomers(res.data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const addCustomer = async () => {
    if (!form.name || !form.mobile) {
      alert("Please fill required fields");
      return;
    }

    await axios.post("http://localhost:5000/api/customers", form);
    alert("Customer Added");

    setForm({
      name: "",
      mobile: "",
      email: "",
      address: "",
      nationality: "",
      gender: "",
      idProof: "",
      idNumber: ""
    });

    fetchCustomers();
  };

  return (
    <div>
      <Navbar />

      <div className="customer-container">
        <h2>Customer Details</h2>

    
        <div className="form-group">
          <label>Name</label>
          <input
            placeholder="Enter Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Mobile</label>
          <input
            placeholder="Enter Mobile"
            value={form.mobile}
            onChange={e => setForm({ ...form, mobile: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            placeholder="Enter Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            placeholder="Enter Address"
            value={form.address}
            onChange={e => setForm({ ...form, address: e.target.value })}
          />
        </div>

       
        <div className="form-group">
          <label>Nationality</label>
          <select
            value={form.nationality}
            onChange={e => setForm({ ...form, nationality: e.target.value })}
          >
            <option value="" disabled hidden>Select Nationality</option>
            <option value="Indian">Indian</option>
            <option value="NRI">NRI</option>
            <option value="Foreigner">Foreigner</option>
          </select>
        </div>

        <div className="form-group">
          <label>Gender</label>
          <div className="gender-box">
            <label>
              <input
                type="checkbox"
                checked={form.gender === "Male"}
                onChange={() => setForm({ ...form, gender: "Male" })}
              />
              Male
            </label>

            <label>
              <input
                type="checkbox"
                checked={form.gender === "Female"}
                onChange={() => setForm({ ...form, gender: "Female" })}
              />
              Female
            </label>

            <label>
              <input
                type="checkbox"
                checked={form.gender === "Other"}
                onChange={() => setForm({ ...form, gender: "Other" })}
              />
              Other
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>ID Proof</label>
          <select
            value={form.idProof}
            onChange={e => setForm({ ...form, idProof: e.target.value })}
          >
            <option value="" disabled hidden>Select ID Proof</option>
            <option value="Aadhar">Aadhar Card</option>
            <option value="Passport">Passport</option>
            <option value="License">Driving License</option>
          </select>
        </div>

        <div className="form-group">
          <label>ID Number</label>
          <input
            placeholder="Enter ID Number"
            value={form.idNumber}
            onChange={e => setForm({ ...form, idNumber: e.target.value })}
          />
        </div>

     
        <button className="full-width" onClick={addCustomer}>
          Add Customer
        </button>
      </div>
    </div>
  );
}

export default Customers;