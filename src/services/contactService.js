/*
  No backend yet — this simulates a network call so ContactForm can already
  be built against a real async contract. Swap the body for a fetch() to
  the real contact endpoint once the backend exists; callers don't change.
*/
export function submitContactMessage(formData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.info('[contactService] message received (mock):', formData);
      resolve({ ok: true });
    }, 600);
  });
}
