// Utility to scroll and focus the first field of a form by form id and first field id
export function scrollToAndFocus(formId: string, firstFieldId: string) {
  const form = document.getElementById(formId);
  const firstField = document.getElementById(firstFieldId);
  if (form && firstField) {
    firstField.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
      firstField.focus({ preventScroll: true });
    }, 400); // allow scroll to finish
  }
}
