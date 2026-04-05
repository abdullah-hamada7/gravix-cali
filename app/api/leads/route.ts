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
        { error: "تعذر الوصول إلى Google Sheets webhook. تأكد أن رابط Apps Script صحيح ومتاح كـ Web App." },
        { status: 502 }
      );
    }

    const responseText = await response.text();

    if (typeof responseText === "string" && /google drive|docs-drivelogo|drive\.google/i.test(responseText)) {
      return NextResponse.json(
        {
          error:
            "رابط Google Apps Script الحالي غير متاح للعامة. أعد نشره كـ Web App واختر Anyone ثم استخدم رابط /exec في متغير GOOGLE_SHEETS_WEBHOOK_URL.",
        },
        { status: 502 }
      );
    }

    const result = JSON.parse(responseText || "null");

    if (!result || result.error || result.success !== true) {
      return NextResponse.json(
        { error: "Google Sheets webhook رفض حفظ الطلب. راجع إعدادات Apps Script واسم الشيت." },
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
