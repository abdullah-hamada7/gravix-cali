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
    eyebrow: "تدريب Calisthenics أونلاين",
    title: "ابنِ قوة فعلية وسيطرة حقيقية على جسمك.",
    subtitle:
      "برنامج تدريب Calisthenics مصمم للناس اللي عايزة تبني قوة، تتقن المهارات، وتتحرك بخطة واضحة بدل العشوائية. من غير تعقيد، ومن غير اعتماد كامل على الجيم.",
    ctaPrimary: { label: "ابدأ التقديم", href: "#contact" },
    ctaSecondary: { label: "شوف تفاصيل البرنامج", href: "#offer" },
    imageAlt: "لاعب Calisthenics يؤدي مهارة متقدمة",
  },
  about: {
    eyebrow: "المدرب",
    title: "خبرة حقيقية في التدريب والمنافسة داخل Calisthenics",
    story:
      "أنا بشتغل مع الناس اللي عايزة تتقدم فعلاً في Calisthenics، سواء هدفها قوة أساسية، تحسين الفورم، أو الوصول لمهارات زي Handstand و Muscle-up. رحلتي في المجال لم تكن مجرد تدريب شخصي، لكنها مبنية أيضًا على المنافسة والخبرة العملية مع لاعبين بمستويات مختلفة.",
    philosophy:
      "أسلوبي في التدريب قائم على التدرج الصحيح، تحميل مناسب لمستواك، ومتابعة دقيقة للتكنيك. الهدف ليس أن تتعب فقط، بل أن تتطور بشكل واضح وآمن وتبني جسمًا قويًا قادرًا على الأداء الحقيقي.",
    trustBullets: [
      "بطل وطني في الكاليستنكس",
      "مدرب كاليستنكس",
      "مدرب شخصي معتمد",
      "برنامج مبني على التكنيك، القوة، والتدرج العملي",
    ],
  },
  offer: {
    eyebrow: "البرنامج",
    title: "برنامج Calisthenics أونلاين",
    summary:
      "برنامج تدريبي متفصل على مستواك الحالي، هدفك، ووقتك المتاح. لا يوجد نسخ ولصق ولا خطة عامة للجميع. كل خطوة في البرنامج لها هدف واضح وتخدم تقدمك الحقيقي.",
    deliverables: [
      "خطة تدريب شخصية مبنية على مستواك وهدفك",
      "مراجعة للفورم والتكنيك في التمارين الأساسية والمهارية",
      "متابعة مستمرة لتعديل الأحمال والتقدم أسبوعيًا",
      "دعم مباشر للإجابة على أسئلتك أثناء التزامك بالبرنامج",
    ],
    trustBullets: [
      "مناسب للمبتدئين، المتوسطين، والناس اللي عايزة ترجع تتدرب بشكل صح",
      "يمكن تنفيذه بأدوات بسيطة وفي أي مكان مناسب",
      "يركز على بناء أساس قوي قبل مطاردة المهارات المتقدمة",
    ],
    ctaLabel: "قدّم الآن",
  },
  results: {
    eyebrow: "النتائج",
    title: "نتائج ملموسة مع لاعبين حقيقيين.",
    items: [
      {
        type: "testimonial",
        headline: "أول Muscle-up خلال 8 أسابيع",
        body:
          "بدأنا من مستوى بسيط في السحب والتحكم. مع تنظيم التمرين، تحسين التكنيك، والتدرج الصح في الشدة، وصل لأول Muscle-up خلال 8 أسابيع.",
        attribution: "— م.ر.، مبتدئ",
        metric: "5 Pull-ups → أول Muscle-up في 8 أسابيع",
      },
      {
        type: "testimonial",
        headline: "أخيرًا تدريب له اتجاه واضح",
        body:
          "كنت أتمرن بشكل عشوائي لفترة طويلة. الفرق الحقيقي كان في وجود خطة مناسبة لمستواي ومتابعة مستمرة للتكنيك والتقدم، وده غيّر مستواي بالكامل.",
        attribution: "— س.ك.، مستوى متوسط",
      },
    ],
  },
  faq: {
    eyebrow: "الأسئلة",
    title: "الأسئلة الشائعة",
    items: [
      {
        question: "هل البرنامج مناسب لو أنا لسه مبتدئ؟",
        answer:
          "نعم، البرنامج يبدأ من مستواك الحالي فعلًا. لو لسه بتبني أساسك في Push-ups أو Pull-ups، الخطة هتكون مناسبة ليك وتاخدك خطوة بخطوة بدون استعجال.",
      },
      {
        question: "إيه الأدوات اللي أحتاجها؟",
        answer:
          "في أغلب الحالات، عقلة ومساحة حركة كويسة يكفوا جدًا للبداية. ومع الوقت قد نضيف Rings أو Parallel Bars حسب هدفك، لكن البداية لا تحتاج تجهيزات معقدة.",
      },
      {
        question: "هتمرن كام مرة في الأسبوع؟",
        answer:
          "غالبًا من 3 إلى 5 حصص أسبوعيًا، حسب مستواك وقدرتك على الاستشفاء ووقتك المتاح. الفكرة إن البرنامج يخدم حياتك، مش يعطلك عنها.",
      },
      {
        question: "هل يوجد توجيه بخصوص التغذية؟",
        answer:
          "نعم، يوجد توجيه يساعدك في دعم القوة، الاستشفاء، وتحسين الأداء العام. البرنامج ليس نظام دايت تفصيلي، لكنك لن تترك بدون أساس واضح في التغذية.",
      },
      {
        question: "متى أبدأ ألاحظ فرقًا؟",
        answer:
          "غالبًا ستبدأ تلاحظ فرقًا في القوة والسيطرة على الجسم خلال أول أسابيع قليلة. أما المهارات مثل Handstand أو Muscle-up فتحتاج التزامًا واستمرارية، والمدة تختلف حسب مستواك الحالي.",
      },
    ],
  },
  contact: {
    eyebrow: "ابدأ",
    title: "جاهز تبدأ بشكل جاد؟",
    subtitle:
      "املأ النموذج وسأتواصل معك لمراجعة مستواك الحالي، أهدافك، وما إذا كان البرنامج مناسبًا لك فعلًا.",
    ctaLabel: "إرسال الطلب",
    socialLinks: [
      { label: "إنستغرام", href: "#" }],
  },
};
