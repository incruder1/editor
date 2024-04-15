
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { drawRect, breakTextIntoLines } from '../../utils/constants.js';


function Canvas({ adInfo }) {
  const canvasRef = useRef(null);
  const textcanvasRef = useRef(null);
  const ctacanvasRef = useRef(null);
  const { caption, urls, cta } = adInfo;
  useEffect(() => {
    drawTemplate();
  }, []);

  useEffect(() => {
    if (caption.text !== undefined) {
      writeTextContent(adInfo.caption.text);
    }
    if (adInfo.adImage !== undefined) {
      drawAdImage(adInfo.adImage);
    }
    if (cta.text !== undefined) {
      writeCTA(adInfo.cta.text);
    }
  }, [adInfo]);

  const drawTemplate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    const image2 = new Image();
    const image3 = new Image();

    image.onload = () => {
      ctx.drawImage(image, 0, 0);
    };
    image2.onload = () => {
      ctx.drawImage(image2, 0, 0);
    };
    image3.onload = () => {
      ctx.drawImage(image3, 0, 0);
    };
    image.src = urls.design_pattern;
    image2.src = urls.mask;
    image3.src = urls.stroke;
  };

  const drawAdImage = (imgUrl) => {
    // Get the canvas and its 2D context
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set the global composite operation to 'source-atop' for masking
    ctx.globalCompositeOperation = 'source-atop';

    // Clear the specified area on the canvas
    ctx.clearRect(56, 442, 970, 600);

    // Create a new image element and set its source to the provided image URL
    const image = new Image();
    image.onload = () => {
      // Once the image is loaded, draw it on the canvas within the specified area
      ctx.drawImage(image, 56, 440, 970, 600);
    };
    image.src = imgUrl || adInfo.adImage; // Use the provided image URL or a default image URL

    // Reset the global composite operation to default ('source-over') after drawing
    ctx.globalCompositeOperation = 'source-over';
  };


  const writeTextContent = (text) => {
    const canvas = textcanvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear the canvas
    const { width, height } = adInfo.image_mask;

    ctx.clearRect(0, 0, width, height);

    // Set font style and color
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '46px Sans-serif';

    let startY = 100; // Starting y-coordinate for text

    // If no text is provided, use the default adText
    const textToWrite = text || caption.text;
    const lines = breakTextIntoLines(textToWrite, 31,100);
    lines.forEach((line) => {
      ctx.fillText(line, 120, startY);
      startY += 50;
    });

  };


  const writeCTA = (text) => {
    const canvas = ctacanvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const backgroundColor = '#000000';
    const textToWrite = text || "Shop Now";

    // Break the text into lines (max 15 characters per line)
    const lines = breakTextIntoLines(textToWrite, 20,15);

    ctx.font = '30px Sans-serif';
    const textWidth = ctx.measureText(lines[0]).width;
    const textHeight = lines.length * 30;

    const boxWidth = textWidth + 48; // Add some padding
    const boxHeight = textHeight + 48;

    // Draw a rectangular background for the text
    drawRect(100, 320, boxWidth, boxHeight, 20, backgroundColor, ctx);

    let startY = 320 + (boxHeight / 2 + 8); // Calculate the starting y-coordinate
    const startX = 100+24; // Calculate the starting x-coordinate

    ctx.fillStyle = '#ffffff'; // Set text color to white

    // Draw each line of text
    lines.forEach((line) => {
      ctx.fillText(line, startX, startY);
      startY += 30; // Move down for the next line
    });
  };
  const calculateCTAWidth = (text) => {
    const canvas = ctacanvasRef.current;
    const ctx = canvas.getContext('2d');
    const lines = breakTextIntoLines(text, 20,30);
    const longestLine = lines.reduce((a, b) => (a.length > b.length ? a : b), '');
    return ctx.measureText(longestLine).width + 48;
  };
  return (
    <>
      <canvas
        className='w-56 sm:w-[30rem]'
        ref={canvasRef}
        width={1080}
        height={1080}
        style={{ backgroundColor: `${adInfo.cta.background_color}`, position: 'absolute' }}
      ></canvas>
      <canvas
        className='w-56 sm:w-[30rem]'
        ref={textcanvasRef}
        width={1080}
        height={1080}
        style={{ position: 'absolute' }}
      ></canvas>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <canvas
          className='w-56 sm:w-[30rem]'
          ref={ctacanvasRef}
          width={1080}
          height={1080}
          style={{ position: 'absolute' }}
        ></canvas>
      </div>
    </>
  );
}

Canvas.propTypes = {
  adInfo: PropTypes.shape({
    adText: PropTypes.string,
    adImage: PropTypes.string,
    adCTA: PropTypes.string,
    adBgColor: PropTypes.string,
  }),
};

export default Canvas;

