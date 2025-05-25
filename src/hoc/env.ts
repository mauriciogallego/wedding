/* eslint-disable no-unused-vars */
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const skipMiddleware = "development";

export const applyMiddleware = (
  middleware: (request: NextRequest) => NextResponse
) => {
  if (process.env.NODE_ENV !== skipMiddleware) {
    return NextResponse.next();
  }

  return middleware;
};
