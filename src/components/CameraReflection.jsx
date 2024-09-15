import React, { useEffect, useRef } from "react";
import "../../src/CameraReflection.css";

const CameraReflection = ({ onClose }) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const videoStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        streamRef.current = videoStream;
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
  }, []);

  return (
    <div className="cameraReflectionOverlay" onClick={onClose}>
      <div className="cameraReflection" onClick={(e) => e.stopPropagation()}>
        <div className="cameraHeader">
          <h3>Camera Reflection</h3>
          <button className="closeButton" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="videoContainer">
          <video ref={videoRef} className="video" autoPlay playsInline />
        </div>
        <button className="closeCameraButton" onClick={onClose}>
          Close Camera
        </button>
      </div>
    </div>
  );
};

export default CameraReflection;
