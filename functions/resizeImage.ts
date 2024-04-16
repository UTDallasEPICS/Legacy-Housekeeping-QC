// Retrieved from https://stackoverflow.com/questions/16500848/how-to-generate-a-thumbnail-image-after-adding-an-image-inside-an-input-type-fi
export function generateThumbnail(file, boundBox) {
  if (!boundBox || boundBox.length != 2) {
    throw "You need to give the boundBox";
  }
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Context not available");
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onerror = reject;
    img.onload = function () {
      const scaleRatio =
        Math.min(...boundBox) / Math.max(img.width, img.height);
      const w = img.width * scaleRatio;
      const h = img.height * scaleRatio;
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);
      return resolve(canvas.toDataURL(file.type));
    };
    img.src = window.URL.createObjectURL(file);
  });
}
