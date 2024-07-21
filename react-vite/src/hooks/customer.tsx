import Customer from "../types/Customer";
import { useMutation, useQuery } from "@tanstack/react-query";
import Handlers, { queryClient } from "../api/handlers";
import CustomersApi from "../api/CustomersApi";

export function useCustomers(select?: (customers: Customer[]) => any) {
  const customerQuery = useQuery({
    queryKey: [Handlers.CUSTOMERS_KEY],
    queryFn: CustomersApi.getCustomers,
    select,
    staleTime: 120000,
  });

  const mutation = useMutation({
    mutationFn: CustomersApi.saveCustomer,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [Handlers.CUSTOMERS_KEY] });
    },
  });

  function createNewCustomer(customer: Customer) {
    mutation.mutate(customer);
  }

  return {
    ...customerQuery,
    createNewCustomer,
  };
}

export function useCustomerDescriptions(customerID: number) {
  const customerQuery = useCustomers(
    buildSelectCustomerDescription(customerID),
  );

  return customerQuery;
}

export function useCustomerRoutes(customerId: number) {
  const customerRoutesQuery = useQuery({
    queryKey: [Handlers.CUSTOMER_ROUTES_KEY],
    queryFn: () => CustomersApi.getCustomerRoutes(customerId),
    staleTime: 120000,
  });

  return customerRoutesQuery;
}

export function useCustomer(customerID: number) {
  const customerQuery = useCustomers(buildSelectCustomer(customerID));

  return customerQuery;
}

function buildSelectCustomer(customerID: number) {
  return (customers: Customer[]) => {
    return customers.find((customer) => customer.id === customerID);
  };
}

function buildSelectCustomerDescription(customerID: number) {
  return (customers: Customer[]) => {
    const customerDescriptions = customers.find((customer) => customer.id === customerID)?.descriptions
    if (!customerDescriptions) {
      throw new Error(`No customer descriptions for customer:${customerID}`)
    }

    return customerDescriptions;
  };
}
