export default function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="section-title text-xl font-semibold tracking-tight mb-3">
      {children}
    </h2>
  );
} 