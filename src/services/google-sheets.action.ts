"use server";

import { google } from "googleapis";
import { GoogleAuth } from "@/types";

interface SheetColumn {
  range: string;
  key: string;
}

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

const REQUIRED_COLUMNS: SheetColumn[] = [
  { range: "invites!B2:B293", key: "name" },
  { range: "invites!D2:D293", key: "companions" },
  { range: "invites!E2:E293", key: "children" },
  { range: "invites!F2:F293", key: "plusOne" },
  { range: "invites!M2:M293", key: "invitationName" },
];

async function fetchColumnData(glSheets: any, column: SheetColumn) {
  const response = await glSheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: column.range,
  });
  return response.data.values || [];
}

function combineColumnData(columnsData: string[][], rowCount: number) {
  return Array.from({ length: rowCount }, (_, index) => ({
    name: columnsData[0][index]?.[0] || "",
    companions: columnsData[1][index]?.[0] || "",
    children: columnsData[2][index]?.[0] || "",
    plusOne: columnsData[3][index]?.[0] || "",
    invitationName: columnsData[4][index]?.[0] || "",
    row: index + 2,
  }));
}

export default async function getSheetData() {
  const glAuth = await getGlAuth();
  const glSheets = google.sheets({ version: "v4", auth: glAuth });

  const columnsData = await Promise.all(
    REQUIRED_COLUMNS.map((column) => fetchColumnData(glSheets, column))
  );

  const rowCount = columnsData[0].length;
  const combinedData = combineColumnData(columnsData, rowCount);

  return { data: combinedData };
}

export async function updateSheetData(guest: {
  row: number;
  status: string;
  companions?: string;
}) {
  const glAuth = await getGlAuth();

  const glSheets = google.sheets({ version: "v4", auth: glAuth });

  try {
    await glSheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `invites!G${guest.row}:G${guest.row}`,
      valueInputOption: "RAW",
      requestBody: { values: [[guest.status]] },
    });

    if (guest.companions) {
      await glSheets.spreadsheets.values.update({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: `invites!H${guest.row}:H${guest.row}`,
        valueInputOption: "RAW",
        requestBody: { values: [[guest.companions]] },
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export async function updateNumberOfPeople(guest: {
  row: number;
  companions: string;
}) {
  const glAuth = await getGlAuth();

  const glSheets = google.sheets({ version: "v4", auth: glAuth });

  try {
    await glSheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `invites!H${guest.row}:H${guest.row}`,
      valueInputOption: "RAW",
      requestBody: { values: [[guest.companions]] },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function updateNumberOfChildren(guest: {
  row: number;
  children: string;
}) {
  const glAuth = await getGlAuth();

  const glSheets = google.sheets({ version: "v4", auth: glAuth });

  try {
    await glSheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `invites!I${guest.row}:I${guest.row}`,
      valueInputOption: "RAW",
      requestBody: { values: [[guest.children]] },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function updatePlusOne(guest: { row: number; plusOne: string }) {
  const glAuth = await getGlAuth();

  const glSheets = google.sheets({ version: "v4", auth: glAuth });

  try {
    await glSheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `invites!J${guest.row}:J${guest.row}`,
      valueInputOption: "RAW",
      requestBody: { values: [[guest.plusOne]] },
    });
  } catch (error) {
    console.error(error);
  }
}
