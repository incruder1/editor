
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { strBreak, drawRect } from '../../utils/constants.js';


function Canvas({ adInfo }) {
  const canvasRef = useRef(null);
  const textcanvasRef = useRef(null);
  const ctacanvasRef = useRef(null);
  const defaultBgColor = '#0369A1';
  const adText = '1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs';
  const adCTA = 'Shop Now';
  const adImage = 'https://apartmentshoustonenergycorridor.com/wp-content/uploads/2018/06/Two-Bedroom-Apartment-in-Houston-TX-5.png';

  useEffect(() => {
    drawTemplate();
  }, []);

  useEffect(() => {
    if (adInfo.adText !== undefined) {
      writeTextContent(adInfo.adText);
    }
    if (adInfo.adImage !== undefined) {
      drawAdImage(adInfo.adImage);
    }
    if (adInfo.adCTA !== undefined) {
      writeCTA(adInfo.adCTA);
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
    

    image.src = 'https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Design_Pattern.png';
    image2.src = 'https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_mask.png';
    image3.src = 'https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Mask_stroke.png?random=12345';
  };

  const drawAdImage = (img) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'source-atop';
    ctx.clearRect(56, 442, 970, 600);
    const image = new Image();
    image.onload = () => {
      ctx.drawImage(image, 56, 442, 970, 600);
    };
    image.src = img || adImage;
    ctx.globalCompositeOperation = 'source-over';
  };

  const writeTextContent = (text) => {
    const canvas = textcanvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '44px Arial';
    let start = 90;
    if (!text) {
      text = adText;
    }
    const lines = strBreak(text, 31);
    lines.map((line) => {
      ctx.fillText(line, 50, start);
      start += 50;
    });
  };

  const writeCTA = (text) => {
    const canvas = ctacanvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const bgColor = '#000000';
    if (text === '') {
      text = adCTA;
    }
    const lines = strBreak(text, 20);
    ctx.font = '30px Arial';
    const text_width = ctx.measureText(lines[0]).width;
    const text_height = lines.length * 30;
    const width = text_width + 48;
    const height = text_height + 48;
    drawRect(190, 320, width, height, 20, bgColor, ctx);
    let starty = 320 + (height / 2 + 8);
    const startx = 190 + 24;
    ctx.fillStyle = '#ffffff';
    lines.map((line) => {
      ctx.fillText(line, startx, starty);
      starty += 30;
    });
  };

  return (
    <>
      <canvas
        className='w-56 sm:w-[30rem]'
        ref={canvasRef}
        width={1080}
        height={1080}
        style={{ backgroundColor: `${adInfo.adBgColor}`, position: 'absolute' }}
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

