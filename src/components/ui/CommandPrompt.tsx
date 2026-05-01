import { TerminalCursor } from "./TerminalCursor";

interface CommandPromptProps {
  children?: React.ReactNode;
  showCursor?: boolean;
}

export function CommandPrompt({ children, showCursor = false }: CommandPromptProps) {
  return (
    <span className="font-mono text-sm">
      <span style={{ color: "var(--color-prompt)" }}>~/stefan</span>
      <span style={{ color: "var(--color-muted)" }}> $ </span>
      {children}
      {showCursor && <TerminalCursor />}
    </span>
  );
}
