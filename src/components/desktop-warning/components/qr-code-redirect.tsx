"use client";

import { QRCodeSVG } from "qrcode.react";

type Props = {
  url: string;
  size: number;
};

export default function QRCodeRedirect({ url, size = 128 }: Props) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="cursor-pointer p-2 bg-white rounded-lg">
        <QRCodeSVG value={url} size={size} level="H" />
      </div>
    </div>
  );
}
