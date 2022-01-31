import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { badRequest, ok, serverError } from "../../../../core/presentation/helpers/http-handler";
import { ProjectRepository } from "../../infra/repositories/project-repository";
import { v4 as uuid} from 'uuid'
import { ListOneUserController } from "../../../user/presentation/controller/listOne-user-controller";
import { UserRepository } from "../../../user/infra/repositories/user-repository";

export class CreateProjectController implements Controller{
    constructor(private repository: ProjectRepository) {}

    async execute(req: Request, res: Response) {
        try {
            const { name, description, startDate , endDate, username } = req.body;

            if(!name){
                return badRequest(res, "The name field was not provided");
            }

            if(!username){
                return badRequest(res, "The username field was not provided");
            }


            //validar se existe usuário username


            await this.repository.create({
                uid: uuid(), 
                name: name, 
                description: description ?? undefined,
                startDate: startDate ?? undefined, 
                endDate: endDate ?? undefined, 
                user: username,
            });

            
            return ok(res);
            
        } catch(error) {
            return serverError(res, String(error));
        }
    }

}