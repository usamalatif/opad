import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminPanel = () => {
  const [popupEnabled, setPopupEnabled] = useState(false);
  const toggleButtonRef = useRef(null);
  const [codes, setCodes] = useState([]); // Fetch from backend
  const [newCode, setNewCode] = useState("");
  const [entries, setEntries] = useState({}); // Fetch from backend
  const [editingCode, setEditingCode] = useState(null);
  const [updatedCode, setUpdatedCode] = useState("");

  const API_BASE_URL = process.env.REACT_APP_API_URL;
  // Fetch all presale codes and entries on component mount
  useEffect(() => {
    fetchCodes();
  }, []);

  const fetchCodes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/view`);
      const codesData = response.data;
      // setCodes(codesData.map((code) => code.code));
      setCodes(codesData);
      setEntries(
        codesData.reduce((acc, code) => {
          acc[code.code] = code.entries;
          return acc;
        }, {})
      );
    } catch (error) {
      console.error("Error fetching codes:", error);
      // alert("Failed to fetch codes. Check the console for details.");
    }
  };

  useEffect(() => {
    fetchToggleState();
  }, []);

  const fetchToggleState = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/toggle/state`);
      setPopupEnabled(response.data.popupEnabled);
      // toast.success("Popup Activated");
    } catch (error) {
      console.error("Error fetching toggle state:", error);
      // toast.error("Failed to fetch toggle state. Check the console for details.");
    }
  };

  // const togglePopup = () => {
  //   setPopupEnabled((prev) => !prev);
  // };

  const togglePopup = async () => {
    const newState = !popupEnabled;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_BASE_URL}/toggle/state`,
        {
          popupEnabled: newState,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      setPopupEnabled(response.data.popupEnabled);
      if (newState) {
        toast.success("Popup Activated");
      } else {
        toast.success("Popup Deactivated");
      }
    } catch (error) {
      console.error("Error updating toggle state:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        return;
      }
      if (
        toggleButtonRef.current &&
        toggleButtonRef.current.contains(event.target)
      ) {
        togglePopup();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleButtonRef, popupEnabled]);

  const handleAddCode = async () => {
    if (codes.length >= 10) {
      alert("Maximum of 10 codes allowed!");
      return;
    }
    if (newCode.length > 8) {
      alert("Code length cannot exceed 8 characters!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE_URL}/add`,
        {
          code: newCode,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      if (response.status === 201) {
        fetchCodes(); // Refresh the list of codes
        setNewCode("");
        toast.success("Code added successfully!");
      }
    } catch (error) {
      console.error("Error adding code:", error);
      // alert("Failed to add code. Check the console for details.");
    }
  };

  const handleRemoveCode = async (code) => {
    try {
      const codeToDelete = codes.find((c) => c === code);
      console.log(
        " check the delete code ",
        codeToDelete,
        "and also the code : ",
        code
      );
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${API_BASE_URL}/delete/${codeToDelete._id}`,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      if (response.status === 200) {
        fetchCodes(); // Refresh the list of codes
        toast.success("Code deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting code:", error);
      // alert("Failed to delete code. Check the console for details.");
    }
  };

  const handleUpdateCode = async (oldCode, newCode) => {
    if (newCode.length > 8) {
      toast.error("Code length cannot exceed 8 characters!");
      return;
    }
    if (codes.includes(newCode)) {
      toast.error("Code already exists!");
      return;
    }

    try {
      const codeToUpdate = codes.find((c) => c === oldCode);
      const token = localStorage.getItem("token");
      console.log("check the token : ", token);
      const response = await axios.put(
        `${API_BASE_URL}/update/${codeToUpdate._id}`,
        {
          newCode,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      if (response.status === 200) {
        fetchCodes(); // Refresh the list of codes
        setEditingCode(null);
        toast.success("Code updated successfully!");
      }
    } catch (error) {
      console.error("Error updating code:", error);
      // alert("Failed to update code. Check the console for details.");
    }
  };

  return (
    <div className="bg-transparent text-white min-h-screen">
      {/* Toggle Popup */}
      <div className="mb-6 mt-8">
        <label className="flex items-center space-x-3">
          <span className="text-lg ps-3 font-semibold text-white">
            Toggle Popup:
          </span>
          <button
            ref={toggleButtonRef}
            className={`w-14 h-7 rounded-full p-1 transition-colors ${
              popupEnabled ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                popupEnabled ? "translate-x-7" : "translate-x-0"
              }`}
            ></div>
          </button>
        </label>
      </div>

      {/* Add Code */}
      <div className="mb-8 Gradientbg-clr-3 p-4 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Add Code</h2>
        <div className="flex-col space-y-3">
          <input
            type="text"
            value={newCode}
            onChange={(e) => {
              if (e.target.value.length <= 8) {
                setNewCode(e.target.value);
              }
            }}
            placeholder="Enter new code (max 8 characters)"
            className="flex-1 p-3 border bg-[#182340] text-white border-none rounded-sm outline-none"
          />
          <button
            onClick={handleAddCode}
            className="px-8 font-bold py-3 themeBtn text-white active"
          >
            Add
          </button>
        </div>
      </div>

      {/* Active Codes and Entry Counts */}
      <div className="mb-8 overflow-x-auto">
        <h2 className="text-2xl font-bold text-white ps-5 mb-4">
          Active Codes and Entries
        </h2>
        <div className="Gradientbg-clr-3 rounded-lg p-4 min-w-[700px]">
          {/* Table Headings */}
          <div className="grid grid-cols-4 gap-4 p-2 bg-[#182340] mb-3 py-4 rounded-md">
            <span className="font-semibold">Presale Code</span>
            <span className="font-semibold">Entries</span>
            <span className="font-semibold">Update Code</span>
            <span className="font-semibold">Delete Code</span>
          </div>
          {/* Table Data */}
          <ul className="space-y-2">
            {codes.map((code, index) => (
              <li
                key={index}
                className="grid grid-cols-4 gap-4 p-2 rounded-md items-center bg-[#182340]"
              >
                {/* Presale Code */}
                {console.log("check the code : ", code)}
                <div className="text-lg font-medium text-white">
                  {editingCode === code ? (
                    <input
                      type="text"
                      value={updatedCode}
                      onChange={(e) => {
                        if (e.target.value.length <= 8) {
                          setUpdatedCode(e.target.value);
                        }
                      }}
                      placeholder="Update code"
                      className="p-2 border bg-transparent max-w-36 border-blue-300 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    code.code
                  )}
                </div>
                {/* Entries */}
                <span className="text-white text-sm">
                  {entries[code.code] || 0} entries
                </span>
                {/* Update Code */}
                <div className="flex flex-wrap space-x-2 gap-y-3 items-center justify-start">
                  {editingCode === code ? (
                    <>
                      <button
                        onClick={() => handleUpdateCode(code, updatedCode)}
                        className="px-4 py-2 themeBtn active"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingCode(null)}
                        className="px-4 py-[10px] bg-gradient-to-r font-bold from-[#ff6b6b] to-[#ffa5a5] text-white rounded-full hover:from-[#ff5c5c] hover:to-[#ff8f8f] transition-colors"
                      >
                        Discard
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingCode(code);
                        setUpdatedCode(code.code);
                      }}
                      className="px-4 py-2 themeBtn active"
                    >
                      Update
                    </button>
                  )}
                </div>
                {/* Delete Code */}
                <button
                  onClick={() => handleRemoveCode(code)}
                  className="px-4 py-[10px] w-fit bg-gradient-to-r from-[#ff6b6b] font-bold to-[#ffa5a5] text-white rounded-full hover:from-[#ff5c5c] hover:to-[#ff8f8f] transition-colors"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

// import React, { useState, useEffect, useRef } from "react";

// const AdminPanel = () => {
//   // Template data
//   const [popupEnabled, setPopupEnabled] = useState(false);
//   const toggleButtonRef = useRef(null);
//   const [codes, setCodes] = useState(["PRES8912", "PRES8913", "PRES8914"]);
//   const [newCode, setNewCode] = useState("");
//   const [entries, setEntries] = useState({
//     PRES8912: 10,
//     PRES8913: 5,
//     PRES8914: 3,
//   });
//   const [editingCode, setEditingCode] = useState(null);
//   const [updatedCode, setUpdatedCode] = useState("");

//   const togglePopup = () => {
//     setPopupEnabled((prev) => !prev);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         toggleButtonRef.current &&
//         !toggleButtonRef.current.contains(event.target)
//       ) {
//         return;
//       }
//       if (
//         toggleButtonRef.current &&
//         toggleButtonRef.current.contains(event.target)
//       ) {
//         togglePopup();
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [toggleButtonRef, popupEnabled]);

//   const handleAddCode = () => {
//     if (codes.length >= 10) {
//       alert("Maximum of 10 codes allowed!");
//       return;
//     }
//     if (newCode.length > 8) {
//       alert("Code length cannot exceed 8 characters!");
//       return;
//     }
//     setCodes([...codes, newCode]);
//     setEntries({ ...entries, [newCode]: 0 });
//     setNewCode("");
//   };

//   const handleRemoveCode = (code) => {
//     setCodes(codes.filter((c) => c !== code));
//     const updatedEntries = { ...entries };
//     delete updatedEntries[code];
//     setEntries(updatedEntries);
//   };

//   const handleUpdateCode = (oldCode, newCode) => {
//     if (newCode.length > 8) {
//       alert("Code length cannot exceed 8 characters!");
//       return;
//     }
//     if (codes.includes(newCode)) {
//       alert("Code already exists!");
//       return;
//     }
//     setCodes(codes.map((c) => (c === oldCode ? newCode : c)));
//     setEntries({ ...entries, [newCode]: entries[oldCode] });
//     delete entries[oldCode];
//     setEditingCode(null);
//   };

//   console.log("check popup : ", popupEnabled);

//   return (
//     <div className="bg-transparent text-white min-h-screen">
//       {/* Toggle Popup */}
//       <div className="mb-6 mt-8">
//         <label className="flex items-center space-x-3">
//           <span className="text-lg ps-3 font-semibold text-white">
//             Toggle Popup:
//           </span>
//           <button
//             ref={toggleButtonRef}
//             className={`w-14 h-7 rounded-full p-1 transition-colors ${
//               popupEnabled ? "bg-green-500" : "bg-gray-300"
//             }`}
//           >
//             <div
//               className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
//                 popupEnabled ? "translate-x-7" : "translate-x-0"
//               }`}
//             ></div>
//           </button>
//         </label>
//       </div>

//       {/* Add Code */}
//       <div className="mb-8 Gradientbg-clr-3 p-4 rounded-lg">
//         <h2 className="text-2xl font-bold text-white mb-4">Add Code</h2>
//         <div className="flex-col space-y-3">
//           <input
//             type="text"
//             value={newCode}
//             onChange={(e) => {
//               if (e.target.value.length <= 8) {
//                 setNewCode(e.target.value);
//               }
//             }}
//             placeholder="Enter new code (max 8 characters)"
//             className="flex-1 p-3 border bg-[#182340] text-white border-none rounded-sm outline-none"
//           />
//           <button
//             onClick={handleAddCode}
//             className="px-8 font-bold py-3 themeBtn text-white active"
//           >
//             Add
//           </button>
//         </div>
//       </div>

//       {/* Active Codes and Entry Counts */}
//       <div className="mb-8 overflow-x-auto">
//         <h2 className="text-2xl font-bold text-white ps-5 mb-4">
//           Active Codes and Entries
//         </h2>
//         <div className="Gradientbg-clr-3 rounded-lg p-4 min-w-[700px]">
//           {/* Table Headings */}
//           <div className="grid grid-cols-4 gap-4 p-2 bg-[#182340] mb-3 py-4 rounded-md">
//             <span className="font-semibold">Presale Code</span>
//             <span className="font-semibold">Entries</span>
//             <span className="font-semibold">Update Code</span>
//             <span className="font-semibold">Delete Code</span>
//           </div>
//           {/* Table Data */}
//           <ul className="space-y-2">
//             {codes.map((code, index) => (
//               <li
//                 key={index}
//                 className="grid grid-cols-4 gap-4 p-2 rounded-md items-center bg-[#182340]"
//               >
//                 {/* Presale Code */}
//                 <div className="text-lg font-medium text-white">
//                   {editingCode === code ? (
//                     <input
//                       type="text"
//                       value={updatedCode}
//                       onChange={(e) => {
//                         if (e.target.value.length <= 8) {
//                           setUpdatedCode(e.target.value);
//                         }
//                       }}
//                       placeholder="Update code"
//                       className="p-2 border bg-transparent max-w-36 border-blue-300 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                   ) : (
//                     code
//                   )}
//                 </div>
//                 {/* Entries */}
//                 <span className="text-white text-sm">
//                   {entries[code] || 0} entries
//                 </span>
//                 {/* Update Code */}
//                 <div className="flex flex-wrap space-x-2 gap-y-3 items-center justify-start">
//                   {editingCode === code ? (
//                     <>
//                       <button
//                         onClick={() => handleUpdateCode(code, updatedCode)}
//                         className="px-4 py-2 themeBtn active"
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={() => setEditingCode(null)}
//                         className="px-4 py-[10px] bg-gradient-to-r font-bold from-[#ff6b6b] to-[#ffa5a5] text-white rounded-full hover:from-[#ff5c5c] hover:to-[#ff8f8f] transition-colors"
//                       >
//                         Discard
//                       </button>
//                     </>
//                   ) : (
//                     <button
//                       onClick={() => {
//                         setEditingCode(code);
//                         setUpdatedCode(code);
//                       }}
//                       className="px-4 py-2 themeBtn active"
//                     >
//                       Update
//                     </button>
//                   )}
//                 </div>
//                 {/* Delete Code */}
//                 <button
//                   onClick={() => handleRemoveCode(code)}
//                   className="px-4 py-[10px] w-fit bg-gradient-to-r from-[#ff6b6b] font-bold to-[#ffa5a5] text-white rounded-full hover:from-[#ff5c5c] hover:to-[#ff8f8f] transition-colors"
//                 >
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;
