import React, { useState, useRef, useEffect } from 'react';
import { FaCrop, FaCheck, FaTimes } from 'react-icons/fa';

const ImageCropper = ({ image, onCrop, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 200, height: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const originalWidth = img.width;
      const originalHeight = img.height;
      setImageSize({ width: originalWidth, height: originalHeight });
      
      // Calculate display size (max 600px)
      const maxSize = 600;
      let displayWidth, displayHeight;
      
      if (originalWidth > originalHeight) {
        displayWidth = Math.min(originalWidth, maxSize);
        displayHeight = (originalHeight * displayWidth) / originalWidth;
      } else {
        displayHeight = Math.min(originalHeight, maxSize);
        displayWidth = (originalWidth * displayHeight) / originalHeight;
      }
      
      setDisplaySize({ width: displayWidth, height: displayHeight });
      setScale(displayWidth / originalWidth);
      
      // Set initial crop to center of image
      const centerX = (originalWidth - 200) / 2;
      const centerY = (originalHeight - 200) / 2;
      setCrop({
        x: Math.max(0, centerX),
        y: Math.max(0, centerY),
        width: 200,
        height: 200
      });
    };
    img.src = URL.createObjectURL(image);
  }, [image]);

  const handleMouseDown = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert display coordinates to original image coordinates
    const originalX = x / scale;
    const originalY = y / scale;
    
    // Check if clicking on resize handles
    const handleSize = 10 / scale;
    const handles = {
      'top-left': { x: crop.x, y: crop.y },
      'top-right': { x: crop.x + crop.width, y: crop.y },
      'bottom-left': { x: crop.x, y: crop.y + crop.height },
      'bottom-right': { x: crop.x + crop.width, y: crop.y + crop.height },
      'top': { x: crop.x + crop.width / 2, y: crop.y },
      'bottom': { x: crop.x + crop.width / 2, y: crop.y + crop.height },
      'left': { x: crop.x, y: crop.y + crop.height / 2 },
      'right': { x: crop.x + crop.width, y: crop.y + crop.height / 2 }
    };

    for (const [handle, pos] of Object.entries(handles)) {
      if (Math.abs(originalX - pos.x) <= handleSize && Math.abs(originalY - pos.y) <= handleSize) {
        setIsResizing(true);
        setResizeHandle(handle);
        setDragStart({ x: originalX, y: originalY });
        return;
      }
    }
    
    // Check if click is inside crop area for dragging
    if (originalX >= crop.x && originalX <= crop.x + crop.width && 
        originalY >= crop.y && originalY <= crop.y + crop.height) {
      setIsDragging(true);
      setDragStart({ x: originalX - crop.x, y: originalY - crop.y });
    }
  };

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert display coordinates to original image coordinates
    const originalX = x / scale;
    const originalY = y / scale;
    
    if (isDragging) {
      const newX = originalX - dragStart.x;
      const newY = originalY - dragStart.y;
      
      // Keep crop area within bounds
      const maxX = imageSize.width - crop.width;
      const maxY = imageSize.height - crop.height;
      
      setCrop({
        ...crop,
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    } else if (isResizing) {
      const deltaX = originalX - dragStart.x;
      const deltaY = originalY - dragStart.y;
      
      let newCrop = { ...crop };
      
      switch (resizeHandle) {
        case 'top-left':
          newCrop = {
            x: Math.max(0, crop.x + deltaX),
            y: Math.max(0, crop.y + deltaY),
            width: Math.max(50, crop.width - deltaX),
            height: Math.max(50, crop.height - deltaY)
          };
          break;
        case 'top-right':
          newCrop = {
            x: crop.x,
            y: Math.max(0, crop.y + deltaY),
            width: Math.max(50, crop.width + deltaX),
            height: Math.max(50, crop.height - deltaY)
          };
          break;
        case 'bottom-left':
          newCrop = {
            x: Math.max(0, crop.x + deltaX),
            y: crop.y,
            width: Math.max(50, crop.width - deltaX),
            height: Math.max(50, crop.height + deltaY)
          };
          break;
        case 'bottom-right':
          newCrop = {
            x: crop.x,
            y: crop.y,
            width: Math.max(50, crop.width + deltaX),
            height: Math.max(50, crop.height + deltaY)
          };
          break;
        case 'top':
          newCrop = {
            x: crop.x,
            y: Math.max(0, crop.y + deltaY),
            width: crop.width,
            height: Math.max(50, crop.height - deltaY)
          };
          break;
        case 'bottom':
          newCrop = {
            x: crop.x,
            y: crop.y,
            width: crop.width,
            height: Math.max(50, crop.height + deltaY)
          };
          break;
        case 'left':
          newCrop = {
            x: Math.max(0, crop.x + deltaX),
            y: crop.y,
            width: Math.max(50, crop.width - deltaX),
            height: crop.height
          };
          break;
        case 'right':
          newCrop = {
            x: crop.x,
            y: crop.y,
            width: Math.max(50, crop.width + deltaX),
            height: crop.height
          };
          break;
      }
      
      // Keep within image bounds
      newCrop.x = Math.max(0, Math.min(newCrop.x, imageSize.width - newCrop.width));
      newCrop.y = Math.max(0, Math.min(newCrop.y, imageSize.height - newCrop.height));
      newCrop.width = Math.min(newCrop.width, imageSize.width - newCrop.x);
      newCrop.height = Math.min(newCrop.height, imageSize.height - newCrop.y);
      
      setCrop(newCrop);
      setDragStart({ x: originalX, y: originalY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle(null);
  };

  const handleCrop = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = crop.width;
    canvas.height = crop.height;
    
    ctx.drawImage(
      imageRef.current,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );
    
    canvas.toBlob((blob) => {
      const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
      onCrop(file);
    }, 'image/jpeg', 0.9);
  };

  const renderResizeHandle = (position, x, y) => {
    const handleSize = 8;
    const cursor = {
      'top-left': 'nw-resize',
      'top-right': 'ne-resize',
      'bottom-left': 'sw-resize',
      'bottom-right': 'se-resize',
      'top': 'n-resize',
      'bottom': 's-resize',
      'left': 'w-resize',
      'right': 'e-resize'
    }[position];

    return (
      <div
        className="absolute bg-white border-2 border-blue-500 rounded-full"
        style={{
          left: (x * scale) - handleSize / 2,
          top: (y * scale) - handleSize / 2,
          width: handleSize,
          height: handleSize,
          cursor: cursor
        }}
      />
    );
  };

  // Calculate display coordinates for crop overlay
  const displayCrop = {
    x: crop.x * scale,
    y: crop.y * scale,
    width: crop.width * scale,
    height: crop.height * scale
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaCrop /> Crop Profile Picture
        </h3>
        
        <div className="flex justify-center mb-4">
          <div 
            ref={containerRef}
            className="relative border-2 border-gray-300 rounded-lg overflow-hidden"
            style={{ 
              width: `${displaySize.width}px`, 
              height: `${displaySize.height}px`,
              maxWidth: '100%',
              maxHeight: '70vh'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              ref={imageRef}
              src={URL.createObjectURL(image)}
              alt="Crop preview"
              className="w-full h-full object-contain"
              style={{
                width: `${displaySize.width}px`,
                height: `${displaySize.height}px`
              }}
            />
            
            {/* Crop overlay */}
            <div
              className="absolute border-2 border-blue-500 bg-blue-500 bg-opacity-20 cursor-move"
              style={{
                left: displayCrop.x,
                top: displayCrop.y,
                width: displayCrop.width,
                height: displayCrop.height
              }}
            />
            
            {/* Crop guides */}
            <div
              className="absolute border-l border-white border-opacity-50"
              style={{
                left: displayCrop.x + displayCrop.width / 3,
                top: displayCrop.y,
                height: displayCrop.height
              }}
            />
            <div
              className="absolute border-l border-white border-opacity-50"
              style={{
                left: displayCrop.x + (displayCrop.width * 2) / 3,
                top: displayCrop.y,
                height: displayCrop.height
              }}
            />
            <div
              className="absolute border-t border-white border-opacity-50"
              style={{
                left: displayCrop.x,
                top: displayCrop.y + displayCrop.height / 3,
                width: displayCrop.width
              }}
            />
            <div
              className="absolute border-t border-white border-opacity-50"
              style={{
                left: displayCrop.x,
                top: displayCrop.y + (displayCrop.height * 2) / 3,
                width: displayCrop.width
              }}
            />
            
            {/* Resize handles */}
            {renderResizeHandle('top-left', crop.x, crop.y)}
            {renderResizeHandle('top-right', crop.x + crop.width, crop.y)}
            {renderResizeHandle('bottom-left', crop.x, crop.y + crop.height)}
            {renderResizeHandle('bottom-right', crop.x + crop.width, crop.y + crop.height)}
            {renderResizeHandle('top', crop.x + crop.width / 2, crop.y)}
            {renderResizeHandle('bottom', crop.x + crop.width / 2, crop.y + crop.height)}
            {renderResizeHandle('left', crop.x, crop.y + crop.height / 2)}
            {renderResizeHandle('right', crop.x + crop.width, crop.y + crop.height / 2)}
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-600 mb-4">
          <p>Drag the blue box to move • Drag the white handles to resize • Minimum size: 50x50px</p>
          <p>Current selection: {Math.round(crop.width)} × {Math.round(crop.height)}px</p>
          <p>Original image: {imageSize.width} × {imageSize.height}px • Display: {Math.round(displaySize.width)} × {Math.round(displaySize.height)}px</p>
        </div>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center gap-2"
          >
            <FaTimes /> Cancel
          </button>
          <button
            onClick={handleCrop}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
          >
            <FaCheck /> Apply Crop
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper; 