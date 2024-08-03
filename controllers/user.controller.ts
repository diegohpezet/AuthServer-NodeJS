import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  public static async createUser(req: Request, res: Response) {
    try {
      const { username, password, email } = req.body;
      const user = await UserService.create(username, password, email);
      return res.status(201).json(user)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  };

  public static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAll();
      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  };

  public static async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserService.getOne(id);
      return res.status(200).json(user)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  };

  public static async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { username, password } = req.body;

      if (req.user?.id != id) {
        return res.status(403).json({ error: "You are not authorized to update this user" })
      };

      const user = await UserService.update(id, { username, password });
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  };

  public static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      if (req.user?.id != id) {
        return res.status(403).json({ error: "You are not authorized to update this user" })
      };

      await UserService.delete(id);
      return res.status(204).json({ message: "User deleted successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  };
}