const KOREAN_CHARS_PER_MINUTE = 500;
const ENGLISH_WORDS_PER_MINUTE = 220;

export function estimateReadingMinutes(content: string): number {
  const stripped = content.replace(/```[\s\S]*?```/g, "").replace(/<[^>]+>/g, "");
  const koreanChars = (stripped.match(/[가-힣]/g) ?? []).length;
  const englishWords = (stripped.match(/[A-Za-z]+/g) ?? []).length;
  const minutes =
    koreanChars / KOREAN_CHARS_PER_MINUTE + englishWords / ENGLISH_WORDS_PER_MINUTE;
  return Math.max(1, Math.round(minutes));
}
