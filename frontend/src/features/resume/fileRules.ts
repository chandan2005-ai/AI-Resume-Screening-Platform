export const MAX_RESUME_SIZE = 5 * 1024 * 1024;
export const ACCEPTED_RESUME_EXTENSIONS = ['.pdf', '.doc', '.docx'];

export function validateResumeFile(file: File): string | null {
  const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (!allowed.includes(file.type)) return 'Please upload a PDF or DOC/DOCX file.';
  if (file.size > MAX_RESUME_SIZE) return 'File size must be 5 MB or less.';
  return null;
}
