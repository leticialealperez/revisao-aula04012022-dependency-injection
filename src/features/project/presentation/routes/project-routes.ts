import { Request, Response, Router } from "express";
import { ProjectRepository } from "../../infra/repositories/project-repository";
import { CreateProjectController } from "../controller/create-project-controller";
import { DeleteProjectController } from "../controller/delete-project-controller";
import { ListAllProjectController } from "../controller/listAll-project-controller";
import { ListOneProjectController } from "../controller/listOne-project-controller";
import { UpdateProjectController } from "../controller/update-project-controller";

export class ProjectRouter {
    static getRoutes() {
        const routes = Router();
        
        const projectRepo = new ProjectRepository();
        const createProjectController = new CreateProjectController(projectRepo);
        const listAllProjectController = new ListAllProjectController(projectRepo);
        const listOneProjectController = new ListOneProjectController(projectRepo);
        const updateProjectController = new UpdateProjectController(projectRepo);
        const deleteProjectController = new DeleteProjectController(projectRepo);

        routes.post('/', (req: Request, res: Response) => createProjectController.execute(req, res));
        routes.get('/', (req: Request, res: Response) => listAllProjectController.execute(req, res));
        routes.get('/:projectKey', (req: Request, res: Response) => listOneProjectController.execute(req, res));
        routes.put('/:projectKey', (req: Request, res: Response) => updateProjectController.execute(req, res));
        routes.delete('/:projectKey', (req: Request, res: Response) => deleteProjectController.execute(req, res));

        return routes;
    }
}
