export function validateDescription(desc: string) {
  if (desc.length > 30) {
    return "Description must be <= 30 characters";
  }
  return null;
}

export function validateReference(ref: string) {
  if (!ref) return "Reference required";
  return null;
}