import Description from "./Description";

interface Customer {
  id: number;
  name: string;
  businessName: string;
  abn?: string;
  email?: string;
  routes: any[];
  // TODO delete in favour for routes
  descriptions?: Description[];
}

export default Customer;
