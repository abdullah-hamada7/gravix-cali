export type LeadFormValues = {
  name: string;
  mobile: string;
  trainingLevel: string;
  goal: string;
  message: string;
};

export type FormFieldErrors = Partial<Record<keyof LeadFormValues, string>>;

export type FormStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error";

const EGYPTIAN_MOBILE_REGEX = /^(?:\+20|20|0)?1[0125]\d{8}$/;
const TRAINING_LEVEL_VALUES = new Set(["beginner", "intermediate", "advanced"]);

export function validateField(
  name: keyof LeadFormValues,
  value: string
): string | undefined {
  switch (name) {
    case "name":
      if (!value.trim()) return "اكتب اسمك هنا.";
      if (value.trim().length > 100) return "الاسم طويل جدًا. الحد الأقصى 100 حرف.";
      return undefined;
    case "mobile":
      if (!value.trim()) return "اكتب رقم الموبايل.";
      if (!EGYPTIAN_MOBILE_REGEX.test(value.replace(/[\s-]/g, "")))
        return "رقم الموبايل غير صحيح. مثال: 01234567890 أو +201234567890";
      return undefined;
    case "trainingLevel":
      if (!value) return "اختر مستواك الحالي.";
      if (!TRAINING_LEVEL_VALUES.has(value)) return "اختر مستوى تدريب صحيح.";
      return undefined;
    case "goal":
      if (!value.trim()) return "اكتب هدفك — مثال: أول عضلة أب أو وقوف على اليدين.";
      if (value.trim().length > 200) return "الهدف طويل جدًا. الحد الأقصى 200 حرف.";
      return undefined;
    case "message":
      if (value.trim().length > 500) return "الرسالة طويلة جدًا. الحد الأقصى 500 حرف.";
      return undefined;
    default:
      return undefined;
  }
}

export function validateForm(values: LeadFormValues): FormFieldErrors {
  const errors: FormFieldErrors = {};

  errors.name = validateField("name", values.name);
  errors.mobile = validateField("mobile", values.mobile);
  errors.trainingLevel = validateField("trainingLevel", values.trainingLevel);
  errors.goal = validateField("goal", values.goal);
  errors.message = validateField("message", values.message);

  return errors;
}

export function hasErrors(errors: FormFieldErrors): boolean {
  return Object.values(errors).some((e) => e !== undefined);
}
