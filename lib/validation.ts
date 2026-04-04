export type FormFieldErrors = {
  name?: string;
  email?: string;
  trainingLevel?: string;
  goal?: string;
};

export type FormStatus =
  | "idle"
  | "validating"
  | "submitting"
  | "success"
  | "error";

export function validateField(
  name: string,
  value: string
): string | undefined {
  switch (name) {
    case "name":
      if (!value.trim()) return "الاسم مطلوب.";
      return undefined;
    case "email":
      if (!value.trim()) return "البريد الإلكتروني مطلوب.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "أدخل بريدًا إلكترونيًا صحيحًا.";
      return undefined;
    case "trainingLevel":
      if (!value) return "اختر مستوى التدريب.";
      return undefined;
    case "goal":
      if (!value.trim()) return "أخبرنا عن هدفك الأساسي.";
      return undefined;
    default:
      return undefined;
  }
}

export function validateForm(values: {
  name: string;
  email: string;
  trainingLevel: string;
  goal: string;
}): FormFieldErrors {
  const errors: FormFieldErrors = {};

  errors.name = validateField("name", values.name);
  errors.email = validateField("email", values.email);
  errors.trainingLevel = validateField("trainingLevel", values.trainingLevel);
  errors.goal = validateField("goal", values.goal);

  return errors;
}

export function hasErrors(errors: FormFieldErrors): boolean {
  return Object.values(errors).some((e) => e !== undefined);
}
