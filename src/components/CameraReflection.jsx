import React, { useEffect, useRef } from "react";

const CameraReflection = ({ onClose }) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null); // Use a ref to store the stream

  useEffect(() => {
    const startCamera = async () => {
      try {
        const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = videoStream; // Store the stream in the ref
        if (videoRef.current) {
          videoRef.current.srcObject = videoStream;
          videoRef.current.play();
        }
      } catch (error) {
        console.log("Error accessing camera:", error);
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []); // Run only once on mount

  return (
    <div className="camera-reflection">
      <h3>Camera Reflection</h3>
      <div className="videoContainer">
        <video ref={videoRef} className="video" autoPlay playsInline />
      </div>
      <button onClick={onClose}>Close Camera</button>
    </div>
  );
};

export default CameraReflection;
