import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Popup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [code, setCode] = useState("");
  const [toggleState, setToggleState] = useState(false);
  const [message, setMessage] = useState("");
  const API_BASE_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    fetchToggleState();
  }, []);

  // Fetch the toggle state from the backend
  const fetchToggleState = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/toggle/state`);
      setToggleState(response.data.popupEnabled);
      if (response.data.popupEnabled) {
        const timer = setTimeout(() => setShowPopup(true), 500);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.error("Error fetching toggle state:", error);
    }
  };
  const handleCodeSubmit = async () => {
    try {
      if (code.length !== 8) {
        // toast.error("Code must be 8 characters long!");
        setMessage("Code must be 8 characters long!");
        return;
      }
      const response = await axios.patch(`${API_BASE_URL}/${code}/increment`);
      if (response.status === 200) {
        setShowPopup(false);
        toast.success("Code accepted!");
        setMessage("Code accepted!");
      }
    } catch (error) {
      console.error("Error incrementing entries:", error);
      // toast.error("Wrong Code!");
      setMessage("Wrong Code!");
    }
  };

  // Don't show the popup if toggle state is false
  if (!toggleState || !showPopup) return null;

  return (
    <div className="popup-overlay text-black">
      <div className="popup">
        <div className=" border-b-4 border-b-[#566796] flex items-center justify-center pb-4">
          <img
            src={"/logoss1.png"}
            alt="OptimusZ7"
            className=" w-[80%] h-[100%]"
          />
        </div>
        <div className="bg-white h-full flex-1 rounded-b-[50px] pb-[20px] flex-col items-center justify-center">
          <p className=" text-[#7d7c7c] text-lg py-2 font-bold">
            Enter the code you received to <br /> join the OptimusZ7 presale.
          </p>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="CODE"
            className=" bg-[#E7E7E7] max-w-[190px] text-center py-2 px-4 w-fit border-4 mx-auto outline-none border-none my-3  block"
          />
          <button
            onClick={handleCodeSubmit}
            className="bg-[#ECDEFE] text-black font-bold py-1 mb-4 px-8 rounded-full w-fit border-4 border-[#566796] hover:border-[#c29ff0] hover:scale-[98%]  hover:bg-[#d4b4ff] transition duration-300 ease-in-out "
          >
            ENTER
          </button>
          <div className="text-[#a034b9] flex items-center justify-center text-[11px]">
            {message === "Code must be 8 characters long!" ? (
              <p style={{ color: 'red' }}>Code must be 8 characters long!</p>
            ) : message === "Wrong Code!" ? (
              <p style={{ color: 'red' }}>Wrong Code!</p>
            ) : message === "Code accepted!" ? (
              <p style={{ color: 'green' }}>Code accepted!</p>
            ) : (
              <p></p>
            )}
          </div>

          <p className="text-[#a034b9] flex items-center justify-center text-[11px]">
            Can't access? Reach us at{" "}
            <a href="mailto:contact@optimusZ7.com" className="ml-1">
              contact@optimusZ7.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
