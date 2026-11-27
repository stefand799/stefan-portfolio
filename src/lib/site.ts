// Single source for the public contact address (Contact page + blog replies).
export const CONTACT_EMAIL = "dinu.stefan.social@proton.me";

// mailto link for replying to a blog post. The subject always starts with
// "[blog:<slug>]" so replies can be filtered in the inbox.
export function blogReplyMailto(slug: string, title: string): string {
  const subject = `[blog:${slug}] Re: ${title}`;
  const body = `\n\n---\nIn reply to: "${title}"`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}
