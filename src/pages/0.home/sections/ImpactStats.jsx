import Container from '../../../components/common/Container';

const STATS = [
  { value: '18', label: 'Projects Completed' },
  { value: '25,000+', label: 'People Reached' },
  { value: '6', label: 'Countries' },
  { value: '$1.2M', label: 'Raised for Construction' },
];

export default function ImpactStats() {
  return (
    <section className="bg-primary-800 py-14">
      <Container>
        <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="text-3xl font-display font-extrabold text-white sm:text-4xl">{stat.value}</span>
              <span className="text-sm text-primary-200">{stat.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
