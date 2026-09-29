import api from './axios';

// The backend runs on Render's free tier, which spins the service down after
// ~15 minutes without traffic; the next request then waits 30–60s for it to
// boot. Ping it the moment the site loads, whatever page the visitor lands
// on, so the boot is already under way by the time they reach the Gallery or
// Projects. Failures are irrelevant here — the real requests retry on their own.
export function wakeServer() {
  api.get('/health').catch(() => {});
}
