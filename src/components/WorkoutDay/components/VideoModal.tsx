import React from 'react';

interface VideoModalProps {
  videoId: string | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ videoId, onClose }) => {
  if (!videoId) return null;
  
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-3xl overflow-hidden">
        <div className="relative pb-[56.25%] h-0">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            className="absolute top-0 left-0 w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
        <div className="p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Close Video
          </button>
        </div>
      </div>
    </div>
  );
};