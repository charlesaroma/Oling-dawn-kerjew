import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

/* items: [{ question, answer }]. Single-open accordion — opening one closes
   any other, which keeps a long FAQ list scannable. */
export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="divide-y divide-ink-900/8 overflow-hidden rounded-2xl border border-ink-900/8 bg-surface-card shadow-elevated">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-surface"
              aria-expanded={open}
            >
              <span className="font-display text-lg text-forest-900">{item.question}</span>
              <ChevronDown
                size={18}
                strokeWidth={2}
                className={`shrink-0 text-forest-600 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              />
            </button>
            <div className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-relaxed text-ink-600">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
