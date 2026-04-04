export type NavItem = {
  label: string;
  href: string;
  isPrimary?: boolean;
};

export const navigation: NavItem[] = [
  { label: "عن المدرب", href: "#about" },
  { label: "التدريب", href: "#offer" },
  { label: "النتائج", href: "#results" },
  { label: "الأسئلة الشائعة", href: "#faq" },
  { label: "قدّم طلبك", href: "#contact", isPrimary: true },
];
