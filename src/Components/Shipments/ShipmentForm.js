import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { database } from "../../Firebase/FirebaseConfig";

const ShipmentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state;

  const [formData, setFormData] = useState({
    senderName: "",
    receiverName: "",
    packageWeight: "",
    deliveryAddress: "",
  });

  let name, value;
  const changeHandler = (e) => {
    name = e.target.name;
    value = e.target.value;

    setFormData({ ...formData, [name]: value });
  };

  async function submitHandler(e) {
    e.preventDefault();

    const shipmentTime = shipmentDate();
    const deliveryTime = DeliveryDate();

    try {
      const docRef = await addDoc(collection(database, userId), {
        senderName: formData.senderName,
        receiverName: formData.receiverName,
        packageWeight: formData.packageWeight,
        deliveryAddress: formData.deliveryAddress,
        shipmentDate: shipmentTime,
        DeliveryDate: deliveryTime,
      });

      console.log("Document written with ID: ", docRef.id);
      alert("Shipment Confirmed!");
      navigate("/dashboard", { state: userId });
    } catch (e) {
      alert("Some error occurred!");
      console.log("Error Shipping Package: ", e);
    }
  }

  function shipmentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Fixed to 0-index issue
    const day = date.getDate();

    return `${year}-${month}-${day}`;
  }

  function DeliveryDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Fixed to 0-index issue
    const day = date.getDate();

    const randomNumber = Math.floor(Math.random() * 10);
    return `${year}-${month}-${day + randomNumber + 3}`;
  }

  return (
    <form className="w-full flex flex-col items-center bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 className="text-4xl mt-6 mb-6 text-white font-bold underline">
        Add New Shipment
      </h2>
      <div className="w-full max-w-md">
        <label className="block mb-4">
          <span className="text-gray-300 text-lg font-semibold">
            Sender Name: <sup className="text-red-500">*</sup>
          </span>
          <input
            required
            type="text"
            name="senderName"
            value={formData.senderName}
            onChange={changeHandler}
            placeholder="Enter Sender Name"
            className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:bg-gray-900 focus:outline-none focus:ring-0 text-white"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-300 text-lg font-semibold">
            Receiver Name: <sup className="text-red-500">*</sup>
          </span>
          <input
            required
            type="text"
            name="receiverName"
            value={formData.receiverName}
            onChange={changeHandler}
            placeholder="Enter Receiver Name"
            className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:bg-gray-900 focus:outline-none focus:ring-0 text-white"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-300 text-lg font-semibold">
            Package Weight (kg): <sup className="text-red-500">*</sup>
          </span>
          <input
            required
            type="text"
            name="packageWeight"
            value={formData.packageWeight}
            onChange={changeHandler}
            placeholder="Enter Package Weight"
            className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:bg-gray-900 focus:outline-none focus:ring-0 text-white"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-300 text-lg font-semibold">
            Delivery Address: <sup className="text-red-500">*</sup>
            <small className="text-sm">(Suggested format: building name, city, state, pin-code)</small>
          </span>
          <input
            required
            type="text"
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={changeHandler}
            placeholder="Enter Delivery Address"
            className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:bg-gray-900 focus:outline-none focus:ring-0 text-white"
          />
        </label>
      </div>
      <button
        onClick={submitHandler}
        className="p-2 bg-blue-500 w-40 rounded-full mt-6 hover:bg-blue-700 transition-all duration-200 font-semibold text-white shadow-lg"
      >
        Confirm Shipment
      </button>
    </form>
  );
};

export default ShipmentForm;
