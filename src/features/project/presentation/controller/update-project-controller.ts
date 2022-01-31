import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { ok, serverError } from "../../../../core/presentation/helpers/http-handler";
import { ProjectRepository } from "../../infra/repositories/project-repository";

export class UpdateProjectController implements Controller{
    constructor(private repository: ProjectRepository) {}

    async execute(req: Request, res: Response) {
        try {
            const { name, description, startDate, endDate } = req.body;
            const { projectKey } = req.params

            await this.repository.update(projectKey, {
                name, description, startDate, endDate
            });

            
            return ok(res);
            
        } catch(error) {
            return serverError(res, String(error));
        }
    }

}