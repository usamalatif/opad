import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const token = location.state?.token;
    const [scannedStatus, setScannedStatus] = useState();
    const [dataUrl, setDataUrl] = useState('');
    const [otp, setOtp] = useState(Array(6).fill('')); // For 6-digit OTP inputs
    const [errorMessage, setErrorMessage] = useState('');


    /**
 * useEffect to fetch the QR code upon component mount.
 * 
 * - Redirects the user to the login page if no token is found.
 * - Calls the API to generate a QR code using the stored token.
 * - Updates the scanned status and QR code URL based on the response.
 * - Handles errors by displaying an error message if the request fails.
 */

    useEffect(() => {
        if (!token) {
            navigate('/login'); // Redirect to login if token is missing
            return;
        }

        const fetchQRCode = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}admin/generate-qr`, {
                    headers: {
                        'x-access-token': token,
                    },
                });
                console.log("responseresponse", response)
                const { scanned_status, qrCodeUrl, message } = response.data;

                console.log("scanned_status", response.data)

                if (scanned_status) {
                    setScannedStatus(true);
                } else {
                    setScannedStatus(false);
                    setDataUrl(qrCodeUrl);
                }
            } catch (error) {
                console.error('Error fetching QR code:', error);
                if (error?.response?.data?.scanned_status) {
                    setScannedStatus(true);
                }
                setErrorMessage('Failed to fetch QR code. Please try again.');
            }
        };

        fetchQRCode();
    }, [token, navigate]);

    // const handleOtpChange = (value, index) => {
    //     const updatedOtp = [...otp];
    //     updatedOtp[index] = value.slice(-1); // Limit to one character
    //     setOtp(updatedOtp);
    //     console.log("updatedOtp", updatedOtp)
    // };
    /**
 * Handles changes in the OTP input fields.
 * 
 * - Updates the OTP array with the entered digit.
 * - Ensures only one character is stored per input field.
 * - Moves focus to the next input field if a digit is entered.
 */

    const handleOtpChange = (value, index) => {
        const updatedOtp = [...otp];
        updatedOtp[index] = value.slice(-1); // Ensure only one character is entered
        setOtp(updatedOtp);

        // Move focus to the next input if a digit is entered
        if (value && index < otp.length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            const updatedOtp = [...otp];
            updatedOtp[index] = ''; // Clear the current field
            setOtp(updatedOtp);

            // Move focus to the previous input if the current field is emptied
            if (index > 0) {
                document.getElementById(`otp-input-${index - 1}`).focus();
            }
        }
    };


/**
 * Handles OTP submission for verification.
 * 
 * - Joins the OTP array into a string and sends it in a POST request.
 * - Includes the user's token in the request headers.
 * - If verification is successful, stores the new token and navigates to the admin dashboard.
 * - Displays an error message if OTP verification fails.
 */

    const handleOtpSubmit = async () => {
        try {
            const otpString = otp.join('');

            const response = await axios.post(`${process.env.REACT_APP_API}admin/verify`,
                {
                    otp: otpString // Pass the joined OTP here
                },
                {
                    headers: {
                        'x-access-token': token,
                    },
                }
            );
            console.log("responseVerify", response);

            if (response.data.status === 200) {
                localStorage.setItem('token', response.data.token)
                navigate('/admin')
            } else {
                toast.error('Invalid otp');
            }

        } catch (error) {
            console.error('Error fetching admin code:', error);
            setErrorMessage('Failed to fetch admin code. Please try again.');
            toast.error('Invalid otp');
        }
        console.log('Entered OTP:', otp.join(''));
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white py-3">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                <h2 className="text-2xl font-bold mb-6">Authentication</h2>

                {/* {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>} */}

                {!scannedStatus &&
                    <div>
                        <p className="mb-4">Scan the QR Code below:</p>
                        <img src={dataUrl} className="mx-auto mb-6 w-64 h-64" />
                        <p>Please scan the QR code to proceed.</p>
                    </div>
                }

                <div>
                    <p className="mb-4">Enter the 6-digit OTP:</p>
                    <div className="flex justify-center gap-2 mb-6">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-input-${index}`} // Adding unique id for each input field
                                type="text"
                                value={digit}
                                onChange={(e) => handleOtpChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)} // Handle backspace navigation
                                className="w-10 h-12 text-center text-lg font-bold bg-gray-700 border border-gray-600 rounded"
                                maxLength={1}
                            />
                        ))}
                    </div>


                    <button
                        onClick={handleOtpSubmit}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-bold"
                    >
                        Submit OTP
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Auth;
