import { useState } from "react";
import { usePortfolioContent, type PortfolioContent } from "./content";

const PASSCODE = "ashritha20";

const inputClass =
  "w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/40";

export default function EditPanel() {
  const { content, setContent, reset } = usePortfolioContent();
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [draft, setDraft] = useState<PortfolioContent>(content);

  function openPanel() {
    setDraft(content);
    setCode("");
    setError("");
    setOpen(true);
  }

  function tryUnlock() {
    if (code === PASSCODE) {
      setUnlocked(true);
      setDraft(content);
      setError("");
    } else {
      setError("Wrong passcode");
    }
  }

  function update<K extends keyof PortfolioContent>(
    key: K,
    index: number,
    field: string,
    value: string,
  ) {
    const list = [...draft[key]] as unknown as Record<string, string>[];
    list[index] = { ...list[index], [field]: value };
    setDraft({ ...draft, [key]: list });
  }

  function addItem(key: keyof PortfolioContent) {
    const blanks: Record<string, Record<string, string>> = {
      experience: { role: "", company: "", period: "", desc: "" },
      education: { degree: "", institution: "", period: "", desc: "" },
      skills: { number: String(draft.skills.length + 1).padStart(2, "0"), title: "", desc: "", stack: "" },
    };
    setDraft({ ...draft, [key]: [...(draft[key] as unknown[]), blanks[key]] } as PortfolioContent);
  }

  function removeItem(key: keyof PortfolioContent, index: number) {
    setDraft({
      ...draft,
      [key]: (draft[key] as unknown[]).filter((_, i) => i !== index),
    } as PortfolioContent);
  }

  return (
    <>
      <button
        onClick={openPanel}
        aria-label="Edit details"
        className="fixed bottom-5 right-5 z-50 rounded-full border border-white/20 bg-black/70 px-4 py-2 text-xs uppercase tracking-widest text-[#D7E2EA] backdrop-blur transition-opacity hover:opacity-80"
      >
        Edit
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/15 bg-[#111] p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold uppercase tracking-widest text-white">
                {unlocked ? "Edit details" : "Enter passcode"}
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-widest text-white/50 hover:text-white"
              >
                Close
              </button>
            </div>

            {!unlocked ? (
              <div className="flex flex-col gap-3">
                <input
                  type="password"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && tryUnlock()}
                  placeholder="Passcode"
                  className={inputClass}
                />
                {error && <p className="text-sm text-red-400">{error}</p>}
                <button
                  onClick={tryUnlock}
                  className="self-start rounded-full bg-white px-6 py-2 text-xs font-medium uppercase tracking-widest text-black"
                >
                  Unlock
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                <Group
                  title="Internships / Experience"
                  items={draft.experience as unknown as Record<string, string>[]}
                  fields={["role", "company", "period", "desc"]}
                  onChange={(i, f, v) => update("experience", i, f, v)}
                  onRemove={(i) => removeItem("experience", i)}
                  onAdd={() => addItem("experience")}
                />
                <Group
                  title="Education"
                  items={draft.education as unknown as Record<string, string>[]}
                  fields={["degree", "institution", "period", "desc"]}
                  onChange={(i, f, v) => update("education", i, f, v)}
                  onRemove={(i) => removeItem("education", i)}
                  onAdd={() => addItem("education")}
                />
                <Group
                  title="Skills"
                  items={draft.skills as unknown as Record<string, string>[]}
                  fields={["number", "title", "desc", "stack"]}
                  onChange={(i, f, v) => update("skills", i, f, v)}
                  onRemove={(i) => removeItem("skills", i)}
                  onAdd={() => addItem("skills")}
                />
                <Group
                  title="Projects"
                  items={(draft.projects ?? []) as unknown as Record<string, string>[]}
                  fields={["number", "name", "category", "desc"]}
                  onChange={(i, f, v) => update("projects", i, f, v)}
                />

                <div className="flex flex-wrap gap-3 border-t border-white/10 pt-5">
                  <button
                    onClick={() => {
                      setContent(draft);
                      setOpen(false);
                    }}
                    className="rounded-full bg-white px-6 py-2 text-xs font-medium uppercase tracking-widest text-black"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      reset();
                      setOpen(false);
                    }}
                    className="rounded-full border border-white/25 px-6 py-2 text-xs uppercase tracking-widest text-white/70"
                  >
                    Reset to default
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function Group({
  title,
  items,
  fields,
  onChange,
  onRemove,
  onAdd,
}: {
  title: string;
  items: Record<string, string>[];
  fields: string[];
  onChange: (index: number, field: string, value: string) => void;
  onRemove?: (index: number) => void;
  onAdd?: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm uppercase tracking-[0.25em] text-white/60">{title}</h4>
        {onAdd && (
          <button
            onClick={onAdd}
            className="rounded-full border border-white/25 px-4 py-1 text-xs uppercase tracking-widest text-white/70"
          >
            Add
          </button>
        )}
      </div>
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-white/10 p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {fields.map((field) => (
              <label key={field} className="flex flex-col gap-1">
                <span className="text-[11px] uppercase tracking-widest text-white/40">{field}</span>
                <input
                  value={item[field] ?? ""}
                  onChange={(e) => onChange(i, field, e.target.value)}
                  className={inputClass}
                />
              </label>
            ))}
          </div>
          {onRemove && (
            <button
              onClick={() => onRemove(i)}
              className="mt-3 text-xs uppercase tracking-widest text-red-400/80 hover:text-red-300"
            >
              Remove
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
