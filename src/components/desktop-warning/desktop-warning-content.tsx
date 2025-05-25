"use client";

import { Trans } from "react-i18next";
import { Card, CardContent } from "../shared/card/card";
import { Smartphone } from "lucide-react";

export const DesktopWarningContent = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center text-center p-8">
          <div className="mb-6">
            <Smartphone className="h-16 w-16 text-gray-400" />
          </div>

          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            <Trans i18nKey="title" />
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed">
            <Trans i18nKey="description" />
          </p>

          <div className="text-sm text-gray-500">
            <p>
              <Trans i18nKey="qrCode" />
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
