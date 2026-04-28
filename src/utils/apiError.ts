export function getApiErrorMessage(err: any): string {
  return (
    err?.response?.data?.error ||
    err?.response?.data?.detail ||
    err?.message ||
    "Something went wrong"
  );
}