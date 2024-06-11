"use client";
import React, { useState } from "react";
import { saveAs } from "file-saver";
import styles from "./component.module.scss";

const IconGenerator = () => {
  const [file, setFile] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const sizes = [16, 24, 32, 48, 64, 72, 80, 96, 128, 256];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSizeChange = (e) => {
    const size = parseInt(e.target.value, 10);
    setSelectedSizes((prev) =>
      e.target.checked ? [...prev, size] : prev.filter((s) => s !== size)
    );
  };

  const generateIco = async () => {
    if (!file || selectedSizes.length === 0) {
      alert("Please select a file and at least one size.");
      return;
    }

    const images = await Promise.all(
      selectedSizes.map((size) => createResizedImage(file, size))
    );

    const icoBlob = createIcoBlob(images);
    saveAs(icoBlob, "favicon.ico");
  };

  const createResizedImage = (file, size) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, size, size);
        canvas.toBlob((blob) => resolve({ size, blob }), "image/png");
      };
    });
  };

  const createIcoBlob = (images) => {
    const header = new ArrayBuffer(6);
    const headerView = new DataView(header);
    headerView.setUint16(0, 0, true); // Reserved
    headerView.setUint16(2, 1, true); // ICO type
    headerView.setUint16(4, images.length, true); // Number of images

    const imageEntries = [];
    let imageData = [];

    let offset = 6 + images.length * 16; // Initial offset after header and entries

    for (const image of images) {
      const entry = new ArrayBuffer(16);
      const entryView = new DataView(entry);

      const imgSize = image.size > 255 ? 0 : image.size;
      entryView.setUint8(0, imgSize); // Width
      entryView.setUint8(1, imgSize); // Height
      entryView.setUint8(2, 0); // Number of colors
      entryView.setUint8(3, 0); // Reserved
      entryView.setUint16(4, 1, true); // Color planes
      entryView.setUint16(6, 32, true); // Bits per pixel
      entryView.setUint32(8, image.blob.size, true); // Image data size
      entryView.setUint32(12, offset, true); // Offset of image data

      offset += image.blob.size;
      imageEntries.push(new Uint8Array(entry));

      imageData.push(image.blob);
    }

    const blobParts = [header, ...imageEntries, ...imageData];
    return new Blob(blobParts, { type: "image/x-icon" });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>ICO Generator</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className={styles.fileInput}
      />
      <div className={styles.checkboxContainer}>
        {sizes.map((size) => (
          <label key={size} className={styles.checkboxLabel}>
            <input type="checkbox" value={size} onChange={handleSizeChange} />
            {size}x{size}
          </label>
        ))}
      </div>
      <button onClick={generateIco} className={styles.button}>
        Generate ICO
      </button>
    </div>
  );
};

export default IconGenerator;
