export interface Produce {
  $key: any;
  icon: string;
  //count: number;
  title : string;
  palletsOrderedCnt: number;
  storage: string;
  transport: string;
  date: number;
  costPerLb: number;
  location: string;
  loadOffered: number;
  estimatedLoadCost: number;
  vendorName: string;
  days: number;
  combo: string;
  comments: string;
  deliveryDate: string;
  address: string;
  addressComments: string;
  city: string;
  state: string;
  zipCode: string;
  packageDim : string; 
  pOnum : string;
  orderByUser : string;
  orderByFB : string;
  orderByDomain: string;
}
