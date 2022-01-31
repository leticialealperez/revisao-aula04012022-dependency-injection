import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { badRequest, ok, serverError } from "../../../../core/presentation/helpers/http-handler";
import { ProjectRepository } from "../../infra/repositories/project-repository";

export class ListOneProjectController implements Controller{
    constructor(private repository: ProjectRepository) {}

    async execute(req: Request, res: Response) {
        try {
            const { projectKey } = req.params
            const result = await this.repository.listOne(projectKey);

            return ok(res, result);
        } catch(error) {
            return badRequest(res, "Data not found");
        }
    }
}