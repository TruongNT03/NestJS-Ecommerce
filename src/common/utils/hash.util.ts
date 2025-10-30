import * as bcrypt from 'bcrypt';

export const hashingPassword = (password: string): string => {
  const hashPassword = bcrypt.hashSync(password, 10);
  return hashPassword;
};

export const comparePassword = (
  hashingPassword: string,
  password: string,
): boolean => {
  return bcrypt.compareSync(password, hashingPassword);
};
