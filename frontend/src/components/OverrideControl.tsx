interface OverrideControlProps {
    label: string;
    value: boolean;
    onChange: (newValue: boolean) => void;
  }

  export default function OverrideControl({ label, value, onChange }: OverrideControlProps) {
    return (
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="mr-2"
        />
        {label}
      </label>
    );
  }
