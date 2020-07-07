import { getBusinessId } from '../services/api'

export const getBusinessServiceByBusiness = (business_services) => {
  const equalBusiness = bs => bs.business_id == getBusinessId()
  
  return business_services.filter(equalBusiness)[0]
}
