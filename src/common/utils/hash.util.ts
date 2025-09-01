import * as bcrypt from 'bcrypt';

export const hassingPassword = (password: string): string => {
  const hassPassword = bcrypt.hashSync(password, 10);
  return hassPassword;
};

export const comparePassword = (
  hassingPassword: string,
  password: string,
): boolean => {
  return bcrypt.compareSync(password, hassingPassword);
};
