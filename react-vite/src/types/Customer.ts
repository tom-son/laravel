import Description from "./Description";

interface Customer {
  id: number;
  name: string;
  businessName: string;
  abn?: string;
  email?: string;
  descriptions?: Description[];
}

export default Customer;
