import CornerBrackets from "@/components/CornerBrackets";

const cuts = {
  sm: "hud-cut-8",
  md: "",
  lg: "hud-cut-16",
};

export default function HudPanel({
  as: Component = "div",
  className = "",
  innerClassName = "",
  cut = "md",
  brackets = false,
  bracketClassName = "inset-3",
  children,
  ...props
}) {
  return (
    <Component
      className={["hud-panel", cuts[cut], className].filter(Boolean).join(" ")}
      {...props}
    >
      <div
        className={["hud-panel__inner", innerClassName]
          .filter(Boolean)
          .join(" ")}
      >
        {brackets ? <CornerBrackets className={bracketClassName} /> : null}
        {children}
      </div>
    </Component>
  );
}
