"use client";
import React, { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import styles from "./component.module.scss";

const IconGenerator = () => {
  const [file, setFile] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const sizes = [16, 24, 32, 48, 64, 72, 80, 96, 128, 256];

  const handleFileChange = (e) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleSizeChange = (e) => {
    const size = parseInt(e.target.value, 10);
    setSelectedSizes((prev) =>
      e.target.checked ? [...prev, size] : prev.filter((s) => s !== size)
    );
  };

  const generateAssets = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const zip = new JSZip();
    const folder = zip.folder("icons");

    // ユーザー選択のサイズで.ico生成
    const baseImages = await Promise.all(
      selectedSizes.map((size) => createResizedImage(file, size))
    );

    const icoBlob = createIcoBlob(baseImages);
    folder.file("favicon.ico", icoBlob);

    // 固定PNGアイコン
    const fixedIcons = [
      { size: 180, name: "apple-touch-icon.png" },
      { size: 192, name: "icon-192.png" },
      { size: 512, name: "icon-512.png" },
    ];

    for (const { size, name } of fixedIcons) {
      const { blob } = await createResizedImage(file, size);
      folder.file(name, blob);
    }

    // SVGファイルの場合
    if (file.type === "image/svg+xml") {
      folder.file("icon.svg", file);
    }

    // manifest.json
    const manifest = {
      name: "Your App Name",
      short_name: "Short Name",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#000000",
      icons: [
        { src: "icon-192.png", type: "image/png", sizes: "192x192" },
        { src: "icon-512.png", type: "image/png", sizes: "512x512" },
      ],
    };
    folder.file("manifest.json", JSON.stringify(manifest, null, 2));

    // ZIP生成と保存
    zip.generateAsync({ type: "blob" }).then((zipFile) => {
      saveAs(zipFile, "icons.zip");
    });
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
      <button onClick={generateAssets} className={styles.button}>
        Generate All Icons (ZIP)
      </button>
    </div>
  );
};

export default IconGenerator;
