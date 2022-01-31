import { Request, Response, Router } from "express";
import { UserRepository } from "../../infra/repositories/user-repository";
import { CreateUserController } from "../controller/create-user-controller";
import { DeleteUserController } from "../controller/delete-user-controller";
import { ListAllUserController } from "../controller/listAll-user-controller";
import { ListOneUserController } from "../controller/listOne-user-controller";
import { UpdateUserController } from "../controller/update-user-controller";

export class UserRouter {
    static getRoutes() {
        const routes = Router();
        
        const userRepo = new UserRepository();
        const createUserController = new CreateUserController(userRepo);
        const listAllUserController = new ListAllUserController(userRepo);
        const listOneUserController = new ListOneUserController(userRepo);
        const updateUserController = new UpdateUserController(userRepo);
        const deleteUserController = new DeleteUserController(userRepo);

        routes.post('/', (req: Request, res: Response) => createUserController.execute(req, res));
        routes.get('/', (req: Request, res: Response) => listAllUserController.execute(req, res));
        routes.get('/:usernameKey', (req: Request, res: Response) => listOneUserController.execute(req, res));
        routes.put('/:usernameKey', (req: Request, res: Response) => updateUserController.execute(req, res));
        routes.delete('/:usernameKey', (req: Request, res: Response) => deleteUserController.execute(req, res));

        return routes;
    }
}
