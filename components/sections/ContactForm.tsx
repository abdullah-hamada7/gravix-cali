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

const WHATSAPP_NUMBER = "201273550318";

export default function ContactForm() {
  const { contact } = landingContent;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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

  const scrollToFirstError = () => {
    const errorField = Object.keys(fieldErrors).find((key) => fieldErrors[key as keyof FormFieldErrors]);
    if (errorField) {
      const fieldId = `cf-${errorField === "trainingLevel" ? "level" : errorField}`;
      const el = document.getElementById(fieldId);
      el?.focus();
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errors = validateForm({ name, email, trainingLevel, goal });
    setFieldErrors(errors);

    if (hasErrors(errors)) {
      setStatus("validating");
      setGlobalMessage("هناك بعض الحقول التي تحتاج تعديل. راجع الأخطاء أدناه.");
      scrollToFirstError();
      return;
    }

    setStatus("submitting");
    setGlobalMessage("");

    const whatsappMessage = `طلب تدريب جديد:
    
 الاسم: ${name}
 البريد الإلكتروني: ${email}
 مستوى التدريب: ${trainingLevel}
 الهدف: ${goal}
 الرسالة: ${message || "لا توجد"}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

    try {
      const opened = window.open(whatsappUrl, "_blank");
      if (!opened) {
        setStatus("error");
        setGlobalMessage("المتصفح منع فتح واتساب. يرجى السماح بالنوافذ المنبثقة والمحاولة مرة أخرى.");
        return;
      }
      setStatus("success");
      setGlobalMessage(
        "تم فتح واتساب. أرسل الرسالة وسأتواصل معك خلال 48 ساعة."
      );
      setName("");
      setEmail("");
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
    } text-neutral-light px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-lime focus:border-lime`;

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
              <p id="cf-name-error" className="text-red-400 text-xs mt-1" role="alert">
                {fieldErrors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="cf-email" className="block text-neutral-mid text-xs font-semibold tracking-wider mb-1">
              البريد الإلكتروني <span className="text-lime">*</span>
            </label>
            <input
              id="cf-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (touched.email) validateAndSetError("email", e.target.value);
              }}
              onBlur={() => handleBlur("email")}
              maxLength={254}
              autoComplete="email"
              required
              className={fieldClass("email")}
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "cf-email-error" : undefined}
            />
            {fieldErrors.email && touched.email && (
              <p id="cf-email-error" className="text-red-400 text-xs mt-1" role="alert">
                {fieldErrors.email}
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
              <p id="cf-level-error" className="text-red-400 text-xs mt-1" role="alert">
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
              <p id="cf-goal-error" className="text-red-400 text-xs mt-1" role="alert">
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
                جاري فتح واتساب...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                إرسال عبر واتساب
              </span>
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
