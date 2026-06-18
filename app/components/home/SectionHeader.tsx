export default function SectionHeader({ title, description }: { title: any; description: any }) {
  return (
    <div>
      <h2 className="font-serif text-3xl text-[#1a1a1a]">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm text-[#374151] sm:text-base">{description}</p>
    </div>
  );
}
