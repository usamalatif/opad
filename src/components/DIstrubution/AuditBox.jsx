import React, { useRef, useState } from 'react';

const AuditBox = ({ title, address }) => {
    const inputRef = useRef(null);
    const [copyMessage, setCopyMessage] = useState('');

    const handleCopy = () => {
        if (inputRef.current && inputRef.current.value.trim()) {
            navigator.clipboard.writeText(inputRef.current.value)
                .then(() => {
                    setCopyMessage('Text copied to clipboard');
                    setTimeout(() => {
                        setCopyMessage('');
                    }, 1500);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        } else {
            setCopyMessage('No text to copy');
            setTimeout(() => {
                setCopyMessage('');
            }, 1500);
        }
    };

    return (
        <div className='auditbg p-[50px] rounded-xl overflow-hidden max-[600px]:p-[15px]'>
            <h5 className='text-[26px] font-bold pb-[40px] max-[600px]:pb-[10px]'>{title}</h5>

            <div className='flex justify-between items-center gap-3 max-[600px]:flex-col'>
                <div className='input-curver w-full h-[50px] bg-[#47a2df1d] rounded-lg' style={{ border: '1px solid #13e1e537' }}>
                    <input
                        value={address}
                        type="text"
                        disabled={true}
                        className='bg-transparent p-4 mt-[-3px] w-full text-[#C6CCFF] focus:outline-none'
                        ref={inputRef}
                    />
                </div>
                <div
                    className='Gradientbg-clr-2 uppercase rounded-lg w-[154px] h-[50px] p-[2px] text-[20px] font-bold font-["Mona-Sans"] cursor-pointer'
                    onClick={handleCopy}
                >
                    <div className='newBtn flex justify-center items-center bg-[#1E204D] h-full w-full rounded-lg'>
                        <span className='gradient-text'>Copy</span>
                    </div>
                </div>
            </div>

            {copyMessage && (
                <div className='mt-4 p-2 bg-green-900 text-white rounded-lg font-semibold'>
                    {copyMessage}
                </div>
            )}
        </div>
    );
};

export default AuditBox;
