export default function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="section-title text-xl font-semibold tracking-tight mb-3 text-center animate-fadeInDown hover-glow gradient-text">
      {children}
    </h2>
  );
} 