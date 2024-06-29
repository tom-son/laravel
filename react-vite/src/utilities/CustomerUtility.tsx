import Description from "../types/Description";

class CustomerUtility {
    public static filterDeletedDescription(description: Description): boolean {
        return !description.isDeleted
    }
}

export default CustomerUtility;
