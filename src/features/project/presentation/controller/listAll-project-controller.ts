import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { ok, serverError } from "../../../../core/presentation/helpers/http-handler";
import { ProjectRepository } from "../../infra/repositories/project-repository";

export class ListAllProjectController implements Controller{
    constructor(private repository: ProjectRepository) {}

    async execute(req: Request, res: Response) {
        try {
            const result = await this.repository.listAll();

            return ok(res, result);
            
        } catch(error) {
            return serverError(res, String(error));
        }
    }
}