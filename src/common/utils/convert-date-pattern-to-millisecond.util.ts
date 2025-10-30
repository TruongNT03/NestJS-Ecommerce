export function convertDatePatternToSecond(pattern: string) {
  const regex = /^(\d+)([smhd])$/;
  const match = pattern.match(regex);

  if (!match) {
    throw new Error(
      "Thời gian không hợp lệ. Ví dụ hợp lệ: '30d', '10m', '5h', '60s'",
    );
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case 's':
      return value;
    case 'm':
      return value * 60;
    case 'h':
      return value * 60 * 60;
    case 'd':
      return value * 24 * 60 * 60;
    default:
      throw new Error(`Đơn vị không hợp lệ: ${unit}`);
  }
}
