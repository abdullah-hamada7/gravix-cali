export type FormFieldErrors = {
  name?: string;
  mobile?: string;
  trainingLevel?: string;
  goal?: string;
};

export type FormStatus =
  | "idle"
  | "validating"
  | "submitting"
  | "success"
  | "error";

const EGYPTIAN_MOBILE_REGEX = /^(?:\+20|20|0)?1[0125]\d{8}$/;

export function validateField(
  name: string,
  value: string
): string | undefined {
  switch (name) {
    case "name":
      if (!value.trim()) return "اكتب اسمك هنا.";
      return undefined;
    case "mobile":
      if (!value.trim()) return "اكتب رقم الموبايل.";
      if (!EGYPTIAN_MOBILE_REGEX.test(value.replace(/[\s-]/g, "")))
        return "رقم الموبايل غير صحيح. مثال: 01234567890 أو +201234567890";
      return undefined;
    case "trainingLevel":
      if (!value) return "اختر مستواك الحالي.";
      return undefined;
    case "goal":
      if (!value.trim()) return "اكتب هدفك — مثال: أول عضلة أب أو وقوف على اليدين.";
      return undefined;
    default:
      return undefined;
  }
}

export function validateForm(values: {
  name: string;
  mobile: string;
  trainingLevel: string;
  goal: string;
}): FormFieldErrors {
  const errors: FormFieldErrors = {};

  errors.name = validateField("name", values.name);
  errors.mobile = validateField("mobile", values.mobile);
  errors.trainingLevel = validateField("trainingLevel", values.trainingLevel);
  errors.goal = validateField("goal", values.goal);

  return errors;
}

export function hasErrors(errors: FormFieldErrors): boolean {
  return Object.values(errors).some((e) => e !== undefined);
}
