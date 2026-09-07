import type { ReactNode } from "react";

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  children,
}: {
  eyebrow?: string;
  title: any;
  description?: string;
  align?: "center" | "left";
  children?: ReactNode;
}) {
  const alignItems = align === "center" ? "items-center text-center" : "items-start text-left";
  const maxWidth = align === "center" ? "max-w-lg" : "max-w-2xl";

  return (
    <div className={`mb-12 flex flex-col ${alignItems}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full bg-[#2d5a3d]/5 px-4 py-2 text-[12px] font-medium text-[#2d5a3d]">
          {eyebrow}
        </span>
      )}
      <h2 className={`mt-5 font-serif text-[32px] tracking-tight text-[#1a1a1a] sm:text-[40px]`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-[15px] leading-relaxed text-[#888] ${maxWidth}`}>
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
