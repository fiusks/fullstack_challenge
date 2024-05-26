
export const setTokenCookie = (token: string) => {
    document.cookie = `jwtToken=${token}; path=/`;
};
  
export const getTokenFromCookie = (): string | null => {
    const cookieValue = document.cookie.replace(
      /(?:(?:^|.*;\s*)jwtToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    return cookieValue || null;
};
  
  