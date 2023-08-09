export const validationEmail = (email: string): boolean => {
  const res = /\S+@\S+\.\S+/;
  return res.test(email);
};

export const validationPassword = (password: string): boolean => {
  const res = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  return res.test(password);
};
