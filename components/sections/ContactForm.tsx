"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import { landingContent } from "@/content/landing-page";
import {
  validateForm,
  validateField,
  hasErrors,
  type FormFieldErrors,
  type FormStatus,
} from "@/lib/validation";
import { useInView } from "@/lib/useInView";

export default function ContactForm() {
  const { contact } = landingContent;

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [trainingLevel, setTrainingLevel] = useState("");
  const [goal, setGoal] = useState("");
  const [message, setMessage] = useState("");

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<FormFieldErrors>({});
  const [globalMessage, setGlobalMessage] = useState("");

  const validateAndSetError = (fieldName: string, value: string) => {
    const error = validateField(fieldName, value);
    setFieldErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const handleBlur = (fieldName: string) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
  };

  const { ref: refHeading, animationClasses: animHeading } = useInView({ threshold: 0.2 });
  const { ref: refForm, animationClasses: animForm } = useInView<HTMLFormElement>({ threshold: 0.1, direction: "up" });
  const { ref: refMap, animationClasses: animMap } = useInView({ threshold: 0.1 });

  const scrollToFirstError = (errors: FormFieldErrors) => {
    const errorField = Object.keys(errors).find((key) => errors[key as keyof FormFieldErrors]);
    if (errorField) {
      const fieldId = `cf-${errorField === "trainingLevel" ? "level" : errorField}`;
      const el = document.getElementById(fieldId);
      el?.focus();
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errors = validateForm({ name, mobile, trainingLevel, goal });
    setFieldErrors(errors);

    if (hasErrors(errors)) {
      setStatus("validating");
      setGlobalMessage("هناك بعض الحقول التي تحتاج تعديل. راجع الأخطاء أدناه.");
      scrollToFirstError(errors);
      return;
    }

    setStatus("submitting");
    setGlobalMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, mobile, trainingLevel, goal, message }),
      });

      if (!response.ok) {
        throw new Error("Failed to save lead");
      }
    } catch {
      setStatus("error");
      setGlobalMessage(
        "حدث خطأ أثناء حفظ البيانات. تأكد من اتصالك بالإنترنت وحاول مرة أخرى."
      );
      return;
    }

    try {
      setStatus("success");
      setGlobalMessage(
        "تم استلام طلبك بنجاح. سأتواصل معك خلال 48 ساعة."
      );
      setName("");
      setMobile("");
      setTrainingLevel("");
      setGoal("");
      setMessage("");
    } catch (error) {
      setStatus("error");
      setGlobalMessage(
        "حدث خطأ. تأكد من اتصالك بالإنترنت وحاول مرة أخرى."
      );
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setTouched({});
    setFieldErrors({});
    setGlobalMessage("");
  };

  const fieldClass = (field: keyof FormFieldErrors) =>
    `w-full bg-forest-deep border ${
      fieldErrors[field] ? "border-red-500" : "border-emerald"
    } text-neutral-light px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-lime focus:border-lime transition-[border-color,box-shadow] duration-150 ease-out`;

  if (status === "success") {
    return (
      <Section id="contact" dark>
        <div className="text-center">
          <Heading level={2} className="mb-6">
            تم إرسال طلبك
          </Heading>
          <div className="border border-lime bg-forest p-8 max-w-lg mx-auto">
            <p className="text-neutral-light text-sm mb-6">{globalMessage}</p>
            <button
              onClick={handleReset}
              className="text-lime text-sm font-semibold hover:text-limeBright transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-lime"
            >
              تقديم طلب آخر ←
            </button>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section id="contact" eyebrow={contact.eyebrow} dark>
        <div ref={refHeading} className={animHeading}>
          <Heading level={2} className="mb-6">
            {contact.title}
          </Heading>
          <p className="text-neutral-light text-base leading-relaxed mb-10 max-w-xl">
            {contact.subtitle}
          </p>
        </div>

        {globalMessage && status !== "idle" && (
          <div
            role={status === "error" ? "alert" : "status"}
            aria-live={status === "error" ? "assertive" : "polite"}
            className={`mb-6 p-4 border text-sm max-w-lg ${
              status === "error"
                ? "border-red-500 text-red-400"
                : "border-lime text-lime"
            }`}
          >
            {globalMessage}
          </div>
        )}

        <form ref={refForm} className={animForm} onSubmit={handleSubmit} noValidate style={{ transitionDelay: "200ms" }} >
          <div className="max-w-lg space-y-5">
          <div>
            <label htmlFor="cf-name" className="block text-neutral-mid text-xs font-semibold tracking-wider mb-1">
              الاسم <span className="text-lime">*</span>
            </label>
            <input
              id="cf-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (touched.name) validateAndSetError("name", e.target.value);
              }}
              onBlur={() => handleBlur("name")}
              maxLength={100}
              autoComplete="name"
              required
              className={fieldClass("name")}
              aria-invalid={!!fieldErrors.name}
              aria-describedby={fieldErrors.name ? "cf-name-error" : undefined}
            />
            {fieldErrors.name && touched.name && (
              <p id="cf-name-error" className="text-red-300 text-xs mt-1" role="alert">
                {fieldErrors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="cf-mobile" className="block text-neutral-mid text-xs font-semibold tracking-wider mb-1">
              رقم الموبايل <span className="text-lime">*</span>
            </label>
            <input
              id="cf-mobile"
              type="tel"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
                if (touched.mobile) validateAndSetError("mobile", e.target.value);
              }}
              onBlur={() => handleBlur("mobile")}
              maxLength={20}
              autoComplete="tel"
              inputMode="tel"
              placeholder="01234567890"
              required
              className={fieldClass("mobile")}
              aria-invalid={!!fieldErrors.mobile}
              aria-describedby={fieldErrors.mobile ? "cf-mobile-error" : undefined}
            />
            {fieldErrors.mobile && touched.mobile && (
              <p id="cf-mobile-error" className="text-red-300 text-xs mt-1" role="alert">
                {fieldErrors.mobile}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="cf-level" className="block text-neutral-mid text-xs font-semibold tracking-wider mb-1">
              مستوى التدريب <span className="text-lime">*</span>
            </label>
            <select
              id="cf-level"
              value={trainingLevel}
              onChange={(e) => {
                setTrainingLevel(e.target.value);
                if (touched.trainingLevel) validateAndSetError("trainingLevel", e.target.value);
              }}
              onBlur={() => handleBlur("trainingLevel")}
              required
              className={fieldClass("trainingLevel")}
              aria-invalid={!!fieldErrors.trainingLevel}
              aria-describedby={fieldErrors.trainingLevel ? "cf-level-error" : undefined}
            >
              <option value="" disabled>اختر مستواك الحالي</option>
              <option value="beginner">مبتدئ</option>
              <option value="intermediate">متوسط</option>
              <option value="advanced">متقدم</option>
            </select>
            {fieldErrors.trainingLevel && touched.trainingLevel && (
              <p id="cf-level-error" className="text-red-300 text-xs mt-1" role="alert">
                {fieldErrors.trainingLevel}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="cf-goal" className="block text-neutral-mid text-xs font-semibold tracking-wider mb-1">
              الهدف الأساسي <span className="text-lime">*</span>
            </label>
            <input
              id="cf-goal"
              type="text"
              value={goal}
              onChange={(e) => {
                setGoal(e.target.value);
                if (touched.goal) validateAndSetError("goal", e.target.value);
              }}
              onBlur={() => handleBlur("goal")}
              maxLength={200}
              placeholder="مثال: أول عضلة أب، وقوف على اليدين، قوة"
              className={fieldClass("goal")}
              aria-invalid={!!fieldErrors.goal}
              aria-describedby={fieldErrors.goal ? "cf-goal-error" : undefined}
            />
            {fieldErrors.goal && touched.goal && (
              <p id="cf-goal-error" className="text-red-300 text-xs mt-1" role="alert">
                {fieldErrors.goal}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="cf-message" className="block text-neutral-mid text-xs font-semibold tracking-wider mb-1">
              الرسالة <span className="text-neutral-mid">(اختياري)</span>
            </label>
            <textarea
              id="cf-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={500}
              className={`${fieldClass("name")} resize-none`}
              rows={4}
            />
          </div>

          <Button
            label={contact.ctaLabel}
            type="submit"
            variant="primary"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-forest border-t-transparent animate-spin" />
                جاري إرسال الطلب...
              </span>
            ) : (
              <span>إرسال الطلب</span>
            )}
          </Button>
          </div>
        </form>

        <div ref={refMap} className={animMap} style={{ transitionDelay: "300ms" }}>
          <div className="mt-16 max-w-lg">
            <h3 className="text-lime text-sm font-bold tracking-wider mb-4">
              مقر جراڤيكس
            </h3>
            <div className="border border-emerald bg-forest-deep overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d31.2!3d30.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAzJzAwLjAiTiAzMcKwMTInMDAuMCJF!5e0!3m2!1sar!2seg!4v1"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقع جراڤيكس على الخريطة"
                className="w-full"
              />
            </div>
            <a
              href="https://share.google/YduQsSGk44phMeSE8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-lime text-sm font-semibold hover:text-limeBright transition-colors duration-150"
            >
              فتح في خرائط جوجل ←
            </a>
          </div>
        </div>
    </Section>
  );
}
