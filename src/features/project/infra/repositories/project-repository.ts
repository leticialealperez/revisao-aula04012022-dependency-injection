import { Repository } from "typeorm";
import { IProject } from "../../domain/model/project";
import { DatabaseConnection } from "../../../../core/infra/database/connections/connection";
import { Project } from "../../../../core/infra/database/entities/Project";

export class ProjectRepository {
    private repository: Repository<Project>;

    constructor() {
        this.repository = DatabaseConnection.getConnection().manager.getRepository(Project);
    }

    async create(project: IProject) {
        const projectEntity = this.repository.create(project);
        await this.repository.save(projectEntity);
    }

    async listAll() {
        return await this.repository.find({
            order: {
                created_at: "ASC"
            },
            relations: ['user'],
        });
    }

    async listOne(projectKey: string) {
        const project = await this.repository.findOne(projectKey);
        
        if(!project){
            throw Error('Project does not exists');
        }

        return project;
    }

    async listAllProjectsByUser(usernameKey: string){
       return await this.repository.find({
           where: {
               user: {
                   username: usernameKey
               }
           }
       }) 
    }

    async update(projectKey: string, data: Partial<IProject>){
        const project = await this.repository.findOne(projectKey);

        if(!project){
            throw Error('Project does not exists');
        }

        await this.repository.update(projectKey, {
            name: data.name ?? project.name,
            description: data.description ?? project.description,
            startDate: data.startDate ?? project.startDate,
            endDate: data.endDate ?? project.endDate
        });
    }

    async delete(projectKey: string){
        const project = await this.repository.findOne(projectKey);

        if(!project){
            throw Error('Project does not exists');
        }

        await this.repository.delete(projectKey);

    }
}
