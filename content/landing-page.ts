export type ProofItem = {
  type: "testimonial" | "transformation";
  headline: string;
  body: string;
  attribution: string;
  metric?: string;
  image?: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon?: string;
};

export type LandingContent = {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
    imageAlt: string;
  };
  about: {
    eyebrow: string;
    title: string;
    story: string;
    philosophy: string;
    trustBullets: string[];
  };
  offer: {
    eyebrow: string;
    title: string;
    summary: string;
    deliverables: string[];
    trustBullets: string[];
    ctaLabel: string;
  };
  results: {
    eyebrow: string;
    title: string;
    items: ProofItem[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: FAQItem[];
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaLabel: string;
    socialLinks: SocialLink[];
  };
};

export const landingContent: LandingContent = {
  hero: {
    eyebrow: "اونلاين على تمارين الكاليستينكس",
    title: "ابنِ قوة حقيقية. أتقن التحكم بجسمك.",
    subtitle:
      "تدريب منظم على تمارين الكاليستينكس للرياضيين الذين يريدون الانضباط والتحكم والتقدم القابل للقياس — بدون حاجة لصالة رياضية.",
    ctaPrimary: { label: "قدّم طلبك للتدريب", href: "#contact" },
    ctaSecondary: { label: "اطلع على العرض", href: "#offer" },
    imageAlt: "رياضي يؤدي حركة كاليستينكس متقدمة",
  },
  about: {
    eyebrow: "المدرب",
    title: "بُني بالانضباط وليس بالحلول السريعة",
    story:
      "بدأت الكاليستينكس بشريط عقلة فقط وإصرار على ألا أبقى متوسطًا. سنوات من التدريب المستمر والمحاولات الفاشلة والاختراقات علمتني ما ينجح حقًا. الآن أدرب رياضيين مستعدين للعمل الجاد وتحقيق نتائج حقيقية.",
    philosophy:
      "القوة ليست جسدية فقط. إنها الانضباط للحضور، والصبر للتقدم، والصدق في تصحيح الأداء. تدريبي مبني على الهيكل والمساءلة والنتائج التي تشعر بها.",
    trustBullets: [
      "سنوات من التدريب المستمر في الكاليستينكس",
      "منهجية مجربة تركز على القوة والمهارة التدريجية",
      "رياضيون من مستويات المبتدئين إلى المتقدمين",
      "تدريب مباشر وصادق مع مساءلة حقيقية",
    ],
  },
  offer: {
    eyebrow: "البرنامج",
    title: "تدريب كاليستينكس اونلاين",
    summary:
      "تجربة تدريب مخصصة بالكامل مصممة حسب مستواك وأهدافك وجدولك الزمني. لا قوالب جاهزة. لا تخمين. فقط مسار واضح للأمام.",
    deliverables: [
      "خطة تدريب شخصية مبنية على مستواك وأهدافك",
      "تغذية راجعة مفصلة حول شكل كل حركة أساسية",
      "متابعات أسبوعية لتتبع التقدم وتعديل البرنامج",
      "دعم مباشر بين الجلسات للأسئلة والإرشاد",
    ],
    trustBullets: [
      "لا عقود طويلة المدى — ابقَ لأن البرنامج ينجح",
      "مصمم للمبتدئين والرياضيين المتوسطين",
      "تدرب في أي مكان بأقل معدات",
    ],
    ctaLabel: "قدّم طلبك الآن",
  },
  results: {
    eyebrow: "النتائج",
    title: "رياضيون حقيقيون. تقدم حقيقي.",
    items: [
      {
        type: "testimonial",
        headline: "أول عضلة أب في 8 أسابيع",
        body:
          "جئت بالكاد أستطيع عمل 5 تمارين سحب. الهيكل والتغذية الراجعة صنعَا كل الفرق. بعد 8 أسابيع حققت أول عضلة أب.",
        attribution: "— م.ر.، رياضي مبتدئ",
        metric: "5 تمارين سحب → عضلة أب في 8 أسابيع",
      },
      {
        type: "testimonial",
        headline: "أخيرًا خطة مفهومة",
        body:
          "كنت أتدرب بشكل عشوائي لسنوات. وجود مدرب يبرمج أسبوعيًا بالفعل ويتحقق من شكلي غيّر كل شيء.",
        attribution: "— س.ك.، رياضي متوسط",
      },
    ],
  },
  faq: {
    eyebrow: "الأسئلة",
    title: "الأسئلة الشائعة",
    items: [
      {
        question: "هل هذا مناسب للمبتدئين تمامًا؟",
        answer:
          "نعم. البرنامج يتكيف مع مستواك الحالي. إذا كنت بالكاد تستطيع عمل تمرين ضغط، نبدأ من هناك. التقدم مدمج في الخطة خطوة بخطوة حتى لا تضيع.",
      },
      {
        question: "ما المعدات التي أحتاجها؟",
        answer:
          "الحد الأدنى. شريط عقلة ومساحة على الأرض — هذا يكفي للبدء. مع تقدمك، الحلقات أو القضبان المتوازية تساعد، لكنها ليست ضرورية.",
      },
      {
        question: "كم مرة سأتدرب في الأسبوع؟",
        answer:
          "معظم الرياضيين يتدربون 3 إلى 5 أيام في الأسبوع حسب مستواهم وتعافيهم. خطتك مبنية حول جدولك الزمني، وليس العكس.",
      },
      {
        question: "هل تقدم إرشادات تغذية؟",
        answer:
          "التغذية ليست المحور الأساسي، لكني أقدم إرشادات حول التغذية للقوة والتعافي. خطط الوجبات الكاملة خارج النطاق، لكنك لن تُترك للتخمين.",
      },
      {
        question: "متى أشعر بالتقدم؟",
        answer:
          "المبتدئون يلاحظون تحسن القوة خلال 2 إلى 4 أسابيع. المعالم المهارية مثل العضلات الأمامية أو الوقوف على اليدين تعتمد على نقطة بدايتك لكنها تتحقق عادة خلال 6 إلى 12 أسبوعًا من العمل المستمر.",
      },
    ],
  },
  contact: {
    eyebrow: "ابدأ",
    title: "مستعد للالتزام؟",
    subtitle:
      "املأ النموذج أدناه وسأتواصل معك على واتساب لمناقشة أهدافك وما إذا كان هذا البرنامج مناسبًا لك.",
    ctaLabel: "إرسال عبر واتساب",
    socialLinks: [
      { label: "إنستغرام", href: "#" }],
  },
};
