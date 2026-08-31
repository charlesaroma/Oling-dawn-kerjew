import DashboardHeader from './sections/DashboardHeader';
import StatsGrid from './sections/StatsGrid';
import ProfilesByCategoryChart from './sections/ProfilesByCategoryChart';
import ProjectsByFocusChart from './sections/ProjectsByFocusChart';
import ContentLibraryChart from './sections/ContentLibraryChart';
import HighlightsPanel from './sections/HighlightsPanel';
import RegistrationsTrendChart from './sections/RegistrationsTrendChart';
import RecentRegistrations from './sections/RecentRegistrations';
import RecentActivity from './sections/RecentActivity';

export default function DashboardHome() {
  return (
    <div>
      <DashboardHeader />
      <StatsGrid />

      <div className="mt-10 grid gap-6 xl:grid-cols-2">
        <ProfilesByCategoryChart />
        <ProjectsByFocusChart />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <ContentLibraryChart />
        <HighlightsPanel />
      </div>

      <RegistrationsTrendChart />

      <RecentRegistrations />
      <RecentActivity />
    </div>
  );
}
