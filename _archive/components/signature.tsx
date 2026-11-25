export function Signature({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-(family-name:--font-signature) leading-none font-normal ${className}`}
    >
      Simon Bouvatier
    </span>
  );
}
