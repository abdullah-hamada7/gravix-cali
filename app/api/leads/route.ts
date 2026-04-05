import { NextRequest, NextResponse } from "next/server";

const EGYPTIAN_MOBILE_REGEX = /^(?:\+20|20|0)?1[0125]\d{8}$/;

function normalizeEgyptianMobile(value: string) {
  const digits = value.replace(/[\s-]/g, "");

  if (digits.startsWith("+20")) {
    return digits;
  }

  if (digits.startsWith("20")) {
    return `+${digits}`;
  }

  if (digits.startsWith("0")) {
    return `+20${digits.slice(1)}`;
  }

  return `+20${digits}`;
}

export async function POST(request: NextRequest) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Google Sheets webhook not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { name, mobile, trainingLevel, goal, message } = body;
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedMobile = typeof mobile === "string" ? mobile.trim() : "";
    const trimmedTrainingLevel = typeof trainingLevel === "string" ? trainingLevel.trim() : "";
    const trimmedGoal = typeof goal === "string" ? goal.trim() : "";
    const trimmedMessage = typeof message === "string" ? message.trim() : "";
    const normalizedMobile = normalizeEgyptianMobile(trimmedMobile);

    if (!trimmedName || !trimmedMobile || !trimmedTrainingLevel || !trimmedGoal) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!EGYPTIAN_MOBILE_REGEX.test(trimmedMobile.replace(/[\s-]/g, ""))) {
      return NextResponse.json(
        { error: "Invalid mobile" },
        { status: 400 }
      );
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: trimmedName,
        mobile: normalizedMobile,
        trainingLevel: trimmedTrainingLevel,
        goal: trimmedGoal,
        message: trimmedMessage,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Sheets webhook request failed" },
        { status: 502 }
      );
    }

    const result = await response.json().catch(() => null);

    if (!result || result.error || result.success !== true) {
      return NextResponse.json(
        { error: "Sheets webhook rejected the lead" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to save lead" },
      { status: 500 }
    );
  }
}
