export const totalCount = (total_number_of_users, records_per_page) => {
  return Math.ceil(total_number_of_users / records_per_page);
};
