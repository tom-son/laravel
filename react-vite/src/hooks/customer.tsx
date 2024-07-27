import Customer from "../types/Customer";
import { useMutation, useQuery } from "@tanstack/react-query";
import Handlers, { queryClient } from "../api/handlers";
import CustomersApi from "../api/CustomersApi";
import Route from "../types/Route";

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

export function useCustomer(customerID: number) {
  const customerQuery = useCustomers(buildSelectCustomer(customerID));

  return customerQuery;
}

export function useCreateCustomer() {
  const mutation = useMutation({
    mutationFn: (customer: Customer) => CustomersApi.createCustomer(customer),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [Handlers.CUSTOMERS_KEY] });
    },
  });

  return mutation;
}

export function useCustomerRoutes(customerId: number) {
  const customerRoutesQuery = useQuery({
    queryKey: [Handlers.CUSTOMER_ROUTES_KEY, { customerId }],
    queryFn: () => CustomersApi.getCustomerRoutes(customerId),
    staleTime: 120000,
  });

  return customerRoutesQuery;
}

export function useCustomerUpdateRoutes(customerId: number) {
  const mutation = useMutation({
    mutationFn: (props: { customerId: number, route: Route }) => CustomersApi.createCustomerRoute(props.customerId, props.route),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [Handlers.CUSTOMER_ROUTES_KEY, { customerId }] });
    },
  });

  return {
    create: (customerId: number, route: Route) => mutation.mutate({customerId, route})
  };
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
