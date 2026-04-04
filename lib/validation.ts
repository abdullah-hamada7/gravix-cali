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
      if (!value.trim()) return "اكتب اسمك هنا.";
      return undefined;
    case "email":
      if (!value.trim()) return "اكتب بريدك الإلكتروني.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "البريد غير صحيح. مثال: name@example.com";
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
