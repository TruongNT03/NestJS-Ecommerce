export const passwordGenerate = (length: number = 8): string => {
  const lowers = 'abcdefghijklmnopqrstuvwxyz';
  const uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';
  const symbols = '!@#$%^&*()-_=+[]{}<>?';

  const pools = {
    lowers,
    uppers,
    digits,
    symbols,
  };

  const arr: string[] = [];

  // Least one charactor type
  arr.push(lowers[Math.floor(Math.random() * lowers.length)]);
  arr.push(uppers[Math.floor(Math.random() * uppers.length)]);
  arr.push(digits[Math.floor(Math.random() * digits.length)]);
  arr.push(symbols[Math.floor(Math.random() * symbols.length)]);

  const types = Object.keys(pools) as (keyof typeof pools)[];

  for (let i = arr.length; i < length; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const pool = pools[type];
    arr.push(pool[Math.floor(Math.random() * pool.length)]);
  }

  // shuffle array để tránh 4 ký tự đầu luôn cố định theo nhóm
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr.join('');
};
