import { NextRequest, NextResponse } from "next/server";
import {
  hasErrors,
  validateForm,
  type LeadFormValues,
} from "@/lib/validation";

const WEBHOOK_TIMEOUT_MS = 10000;

function jsonError(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

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

function parseLeadForm(body: unknown): LeadFormValues {
  const data = typeof body === "object" && body !== null ? body : {};

  return {
    name: typeof (data as Record<string, unknown>).name === "string"
      ? (data as Record<string, string>).name.trim()
      : "",
    mobile: typeof (data as Record<string, unknown>).mobile === "string"
      ? (data as Record<string, string>).mobile.trim()
      : "",
    trainingLevel:
      typeof (data as Record<string, unknown>).trainingLevel === "string"
        ? (data as Record<string, string>).trainingLevel.trim()
        : "",
    goal: typeof (data as Record<string, unknown>).goal === "string"
      ? (data as Record<string, string>).goal.trim()
      : "",
    message: typeof (data as Record<string, unknown>).message === "string"
      ? (data as Record<string, string>).message.trim()
      : "",
  };
}

export async function POST(request: NextRequest) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    return jsonError("Google Sheets webhook not configured", 500);
  }

  try {
    const form = parseLeadForm(await request.json());
    const errors = validateForm(form);

    if (hasErrors(errors)) {
      return jsonError("Invalid lead payload", 400);
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
      body: JSON.stringify({
        ...form,
        mobile: normalizeEgyptianMobile(form.mobile),
      }),
    });

    if (!response.ok) {
      return jsonError(
        "تعذر الوصول إلى Google Sheets webhook. تأكد أن رابط Apps Script صحيح ومتاح كـ Web App.",
        502
      );
    }

    const responseText = await response.text();

    if (typeof responseText === "string" && /google drive|docs-drivelogo|drive\.google/i.test(responseText)) {
      return jsonError(
        "رابط Google Apps Script الحالي غير متاح للعامة. أعد نشره كـ Web App واختر Anyone ثم استخدم رابط /exec في متغير GOOGLE_SHEETS_WEBHOOK_URL.",
        502
      );
    }

    let result: { error?: string; success?: boolean } | null = null;

    try {
      result = JSON.parse(responseText || "null");
    } catch {
      return jsonError(
        "Google Sheets webhook returned an invalid response. راجع Apps Script deployment.",
        502
      );
    }

    if (!result || result.error || result.success !== true) {
      return jsonError(
        result?.error || "Google Sheets webhook رفض حفظ الطلب. راجع إعدادات Apps Script واسم الشيت.",
        502
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return jsonError("Invalid JSON body", 400);
    }

    if (error instanceof Error && error.name === "TimeoutError") {
      return jsonError("انتهت مهلة الاتصال بـ Google Sheets webhook. حاول مرة أخرى.", 504);
    }

    return jsonError("Failed to save lead", 500);
  }
}
