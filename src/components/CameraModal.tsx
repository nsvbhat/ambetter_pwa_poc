'use client';

import { useEffect, useRef, useState } from 'react';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (blob: Blob) => void;
}

export default function CameraModal({ isOpen, onClose, onCapture }: CameraModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  // Start camera stream
  useEffect(() => {
    if (!isOpen) return;

    const startCamera = async () => {
      try {
        setError(null);
        if (!navigator.mediaDevices?.getUserMedia) {
          setError('Camera not supported on this device');
          return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // Play video once metadata is loaded
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
          };
        }
      } catch (err: any) {
        console.error('Camera error:', err);
        if (err.name === 'NotAllowedError') {
          setError('Camera permission denied. Please allow access in your device settings.');
        } else if (err.name === 'NotFoundError') {
          setError('No camera found on this device.');
        } else {
          setError(`Camera error: ${err.message}`);
        }
      }
    };

    startCamera();

    return () => {
      // Stop all video tracks on cleanup
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [isOpen]);

  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setCapturing(true);
    try {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setError('Failed to access canvas context');
        setCapturing(false);
        return;
      }

      // Flip video horizontally for selfie cam feel (if using front camera)
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0);
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);

      // Convert canvas to blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            // Create preview URL
            const previewUrl = URL.createObjectURL(blob);
            setPreview(previewUrl);
            console.log('✅ Photo captured:', blob.size, 'bytes');
          } else {
            setError('Failed to capture image');
          }
          setCapturing(false);
        },
        'image/jpeg',
        0.95
      );
    } catch (err) {
      console.error('Capture error:', err);
      setError('Failed to capture photo');
      setCapturing(false);
    }
  };

  const handleConfirm = () => {
    if (!canvasRef.current) return;

    canvasRef.current.toBlob(
      (blob) => {
        if (blob) {
          onCapture(blob);
          closeModal();
        }
      },
      'image/jpeg',
      0.95
    );
  };

  const handleRetake = () => {
    setPreview(null);
    // Resume video playback
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const closeModal = () => {
    setPreview(null);
    setError(null);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-pink-600 text-white p-4 flex items-center justify-between rounded-t-lg">
          <h2 className="text-lg font-semibold">📷 Capture Prescription</h2>
          <button
            onClick={closeModal}
            className="text-white hover:text-pink-100 font-bold text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 flex flex-col items-center justify-center bg-black">
          {error ? (
            <div className="text-center">
              <p className="text-red-300 mb-4">⚠️ {error}</p>
              <button
                onClick={closeModal}
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg font-medium"
              >
                Close
              </button>
            </div>
          ) : preview ? (
            <div className="flex flex-col items-center gap-4">
              <img
                src={preview}
                alt="Captured preview"
                className="max-w-full max-h-80 rounded-lg border-4 border-pink-600"
              />
              <p className="text-white text-sm">Does this look good?</p>
            </div>
          ) : (
            <video
              ref={videoRef}
              className="w-full h-full object-cover rounded-lg"
              playsInline
            />
          )}

          {/* Hidden canvas for capture */}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Footer - Action Buttons */}
        <div className="bg-gray-50 p-4 border-t border-gray-200 rounded-b-lg flex gap-3">
          {preview ? (
            <>
              <button
                onClick={handleRetake}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                🔄 Retake
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                ✓ Confirm
              </button>
            </>
          ) : (
            <>
              <button
                onClick={closeModal}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCapture}
                disabled={capturing}
                className="flex-1 bg-pink-600 hover:bg-pink-700 disabled:bg-pink-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                {capturing ? '⏳ Capturing...' : '📸 Capture'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
