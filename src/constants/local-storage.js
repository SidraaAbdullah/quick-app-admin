
export const getLocalStorageValues = () => {
  let Email = localStorage.getItem("Email");  
  return {
    Email:JSON.parse(Email) || {},
  };
};
