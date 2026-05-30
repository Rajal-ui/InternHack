import type { Request, Response, NextFunction } from "express";
import { OpensourceService } from "./opensource.service.js";
import { gsocOrgsQuerySchema } from "./opensource.validation.js";

const opensourceService = new OpensourceService();

export class OpensourceController {
  async getGsocOrgs(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = gsocOrgsQuerySchema.safeParse(req.query);
      if (!parsed.success) {
        res.status(400).json({
          message: "Invalid query parameters",
          errors: parsed.error.flatten().fieldErrors,
        });
        return;
      }

      const result = await opensourceService.getGsocOrgs(parsed.data);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}
