interface TechTagProps {
  label: string;
}

export function TechTag({ label }: TechTagProps) {
  return (
    <span
      className="inline-block font-mono text-xs px-2 py-0.5 transition-colors"
      style={{
        border: "1px solid var(--color-border)",
        color: "var(--color-muted)",
      }}
    >
      {label}
    </span>
  );
}
