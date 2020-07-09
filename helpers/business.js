export const isFranchiseer = (business) => {
  if (business === undefined) { return }
  if (business.attributes === undefined) { return }
  
  const { franchisee } = business.attributes
  
  return franchisee === null || franchisee === ''
}
