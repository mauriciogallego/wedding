"use client";

import { QRCodeSVG } from "qrcode.react";

export default function QRCodeRedirect({
  url,
  size = 128,
}: {
  url: string;
  size: number;
}) {
  console.log(url);
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="cursor-pointer p-2 bg-white rounded-lg">
        <QRCodeSVG value={url} size={size} level="H" />
      </div>
    </div>
  );
}
