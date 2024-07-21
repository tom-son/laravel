import Customer from "../types/Customer";
import requestHandler from "./requestHandler";
import Description from "../types/Description";

class CustomersApi {
  private static async getCustomersFromDB() {
    const result = await requestHandler.get("/customers");

    return result.data;
  }

  public static async getCustomers(): Promise<Customer[]> {
    return await CustomersApi.getCustomersFromDB()
  }

  public static async getCustomerRoutes(customerId: number): Promise<any[]> {
    const response = await requestHandler.get(`/customers/${customerId}/descriptions`);
    return response.data;
  }

  public static async saveCustomer(customer: Customer): Promise<boolean> {
    await requestHandler.post("/customers", customer).catch(() => {
      return false;
    });

    return true;
  }

  public static async addCustomerDescription(customerID: number, description: Description): Promise<boolean> {
    try {
      await requestHandler.post(`/customers/descriptions`, {
        customerID,
        description
      });

      return true;
    }
    catch (error) {
      return false;
    }
  }

  public static async deleteCustomerDescription(customerID: number, descriptionID: number): Promise<boolean> {
    try {
      await requestHandler.delete(`/customers/descriptions`, {
        data: {
          customerID,
          descriptionID
        }
      });

      return true;
    }
    catch (error) {
      return false;
    }
  }
}

export default CustomersApi;
