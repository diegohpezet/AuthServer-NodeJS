import { userModel } from "../models";
import { hashPassword } from "../utils/hash";
import { validatePassword } from "../utils/validations";

export class UserService {
  /**
   * Creates a new user and pushes it into database
   * @param { String } username - Username of the user
   * @param { String } password - Password of the user
   * @param { String } email - Email of the user
   * @returns { userModel } - The user that has been just created
   */
  public static async create(username: string, password: string, email: string) {
    // Check if email is already in use
    const existingUser = await userModel.findOne({ where: { email } })
    if (existingUser) {
      throw new Error("Email already in use")
    }

    // Check if password is valid
    const { isValid, errors } = validatePassword(password)
    if (!isValid) {
      throw new Error(errors.join(' '));
    }

    // Hash password & create user
    const hashedPassword = await hashPassword(password);
    const user = await userModel.create({ username, email, password: hashedPassword });
    return user;
  }

  /**
   * Gets all instances of user from database
   * @returns { Array[userModel] } - Array of all users
   */
  public static async getAll() {
    const users = await userModel.findAll();
    return users
  }

  /**
   * Gets an instance of an user from Databae
   * @param { String } id - The id of the user to find 
   * @returns { userModel } - The user that has been found
   */
  public static async getOne(id: string) {
    const user = await userModel.findOne({ where: { id } });
    if (!user) {
      throw new Error("User not found")
    }
    return user
  }

  /**
   * Updates an instance of an user from database
   * @param { String } id - The id of the user to update
   * @param { Partial<Object> } data - The data to update
   * @returns { userModel } - The user that has been updated
   */
  public static async update(id: string, data: Partial<{ username: string, password: string }>) {
    const user = await userModel.findByPk(id);
    if (!user) {
      throw new Error("User not found")
    }

    if (data.password) {
      const { isValid, errors } = validatePassword(data.password);

      if (!isValid) {
        throw new Error(errors.join(' '));
      }

      data.password = await hashPassword(data.password)
    }
    const updatedUser = user.update(data);
    return updatedUser
  }

  /**
   * Deletes an user from database
   * @param { String } id - The id of the user to delete
   */
  public static async delete(id: string) {
    const user = await userModel.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }

    await user.destroy();
  }
}