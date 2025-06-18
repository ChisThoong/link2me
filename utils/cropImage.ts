export default function getCroppedImg(imageSrc: string, pixelCrop: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');
  
        if (!ctx) return reject();
  
        ctx.drawImage(
          image,
          pixelCrop.x, pixelCrop.y,
          pixelCrop.width, pixelCrop.height,
          0, 0,
          pixelCrop.width, pixelCrop.height
        );
  
        canvas.toBlob((blob) => {
          if (!blob) return reject();
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => resolve(reader.result as string);
        }, 'image/png');
      };
      image.onerror = reject;
    });
  }
  