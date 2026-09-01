import { Home, HeartPulse, ShieldAlert } from 'lucide-react';
import Container from '../../../components/common/Container';
import SectionHeading from '../../../components/common/SectionHeading';

const GAPS = [
  {
    icon: Home,
    title: 'Housing',
    strap: 'Rent falls behind within months',
    points: [
      'Rent for a modest room runs about UGX 700,000 a month.',
      'Savings brought from home are exhausted within weeks.',
      'One to two months of arrears is often all it takes before eviction.',
    ],
  },
  {
    icon: HeartPulse,
    title: 'Healthcare',
    strap: 'When free care still costs money',
    points: [
      'KCCA facilities are free on paper for refugees and nationals alike.',
      'In practice, patients report being asked for money at several points.',
      'Chronic conditions — diabetes, hypertension, cancer — become emergencies.',
    ],
  },
  {
    icon: ShieldAlert,
    title: 'Safety',
    strap: 'Fear that keeps families indoors',
    points: [
      'Harassment and assault confine women and girls to the home.',
      'Language barriers and no local network deepen isolation.',
      'Trauma goes unaddressed without trauma-aware counselling.',
    ],
  },
];

/* Cumulative rent at UGX 700,000/month. Bar widths are proportional to the
   ten-year figure so the shape of the argument is visible, not just the
   numbers. */
const RENT = [
  { period: '1 year', amount: 'UGX 8.4m', pct: 10 },
  { period: '3 years', amount: 'UGX 25.2m', pct: 30 },
  { period: '5 years', amount: 'UGX 42m', pct: 50 },
  { period: '10 years', amount: 'UGX 84m', pct: 100 },
];

export default function DeliveryGap() {
  return (
    <>
      <section className="bg-surface py-20 sm:py-28">
        <Container className="flex flex-col gap-14">
          <SectionHeading
            eyebrow="The delivery gap"
            title="Where the money stops short."
            subtitle="Three failure points documented repeatedly among urban refugee and urban-poor households in Kampala."
          />
          <div className="grid gap-px overflow-hidden rounded-2xl border border-ink-900/10 bg-ink-900/10 lg:grid-cols-3">
            {GAPS.map(({ icon: Icon, title, strap, points }) => (
              <div key={title} className="flex flex-col gap-5 bg-white p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-900/10 text-forest-700">
                  <Icon size={18} strokeWidth={1.6} />
                </span>
                <div>
                  <p className="font-display text-2xl text-forest-900">{title}</p>
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-bronze-600">{strap}</p>
                </div>
                <ul className="flex flex-col gap-3 border-t border-ink-900/8 pt-5">
                  {points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-ink-600">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold-600" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-surface/10 bg-ink-900 py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="The economics of renting"
              title="UGX 700,000 a month buys nothing that lasts."
              tone="dark"
            />
            <p className="mt-6 max-w-[52ch] leading-relaxed text-surface/65">
              A refugee family renting a modest room in Kampala pays roughly UGX 700,000 every month. The money
              leaves. Nothing accumulates. After five years the household owns exactly what it owned on the first
              day — and five years of that rent is enough to own a low-cost housing unit outright.
            </p>
            <ul className="mt-8 flex flex-col gap-4 border-t border-surface/12 pt-8">
              {[
                "Rent rises with market demand; a displaced household's income does not.",
                'Landlords require deposits and advances that arriving families cannot raise.',
                'Every shilling spent on rent is a shilling not spent on food, school or treatment.',
              ].map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-surface/65">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold-500" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <figure className="rounded-2xl border border-surface/12 p-7 sm:p-9">
            <figcaption className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold-400">
              What renting costs, cumulatively
            </figcaption>
            <dl className="mt-8 flex flex-col gap-7">
              {RENT.map(({ period, amount, pct }) => (
                <div key={period}>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm text-surface/60">{period}</dt>
                    <dd className={`font-display text-2xl tabular-nums ${pct === 100 ? 'text-gold-400' : 'text-surface'}`}>
                      {amount}
                    </dd>
                  </div>
                  <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-surface/12">
                    <div
                      className={`h-full rounded-full ${pct === 100 ? 'bg-gold-500' : 'bg-gold-500/55'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </dl>
            <p className="mt-8 border-t border-surface/12 pt-6 font-display text-lg italic text-surface/70">
              …and no asset at the end of any of them.
            </p>
          </figure>
        </Container>
      </section>
    </>
  );
}
