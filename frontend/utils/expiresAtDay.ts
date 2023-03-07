const expiresAtDays = (expiresAt: Date) => {
  console.log(expiresAt);
  if (!expiresAt) {
    return null;
  }
  //calculate the difference between the current date and the expiration date
  expiresAt = new Date(expiresAt);
  const diff = expiresAt.getTime() - new Date().getTime();
  //calculate the difference in days
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  console.log(days);
  return days;
};

export default expiresAtDays;
