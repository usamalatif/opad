// components/Modal.js
import React, { useRef, useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex justify-center items-center p-2" style={{ zIndex: 1000 }}>
            <div
                ref={modalRef}
                className="bg-white p-6 rounded-lg shadow-lg w-1/2 overflow-y-scroll h-[500px]"
                // style={{ background: "linear-gradient(135deg, #0f0c29, #0B0620, #13e1e51f)" }}
            >
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <div className="mb-4">{children}</div>
                {/* <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded">Close</button> */}
            </div>
        </div>
    );
};

export default Modal;
