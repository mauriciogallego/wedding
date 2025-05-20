"use server";

import { google } from "googleapis";
import { GoogleAuth } from "@/types";

let glAuth: GoogleAuth;

async function getGlAuth() {
  if (!glAuth) {
    glAuth = await google.auth.getClient({
      projectId: process.env.GOOGLE_PROJECT_ID,
      credentials: {
        type: "service_account",
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        universe_domain: "googleapis.com",
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  }

  return glAuth;
}

export default async function getSheetData() {
  const glAuth = await getGlAuth();

  const glSheets = google.sheets({ version: "v4", auth: glAuth });

  const { data } = await glSheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "invites!B2:G293",
  });

  return {
    data:
      data.values?.map((value, index) => ({
        name: value[0],
        plusOne: value[4],
        children: value[3],
        companions: value[2],
        row: index + 2,
      })) || [],
  };
}

export async function updateSheetData(guest: { row: number; status: string }) {
  const glAuth = await getGlAuth();

  const glSheets = google.sheets({ version: "v4", auth: glAuth });

  try {
    await glSheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `invites!G${guest.row}:G${guest.row}`,
      valueInputOption: "RAW",
      requestBody: { values: [[guest.status]] },
    });
  } catch (error) {
    console.error(error);
  }
}
