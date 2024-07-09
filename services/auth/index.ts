export const setToken = async (value: any) => {
  try {
    localStorage.setItem('gymbro', value);
  } catch (error) {}
};

export const logout = async () => {
  try {
    localStorage.removeItem('gymbro');
  } catch (error) {
    console.error(error);
  }
};

export const getToken = async () => {
  return localStorage.getItem('gymbro');
};