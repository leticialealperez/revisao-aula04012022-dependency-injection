import { Repository } from "typeorm";
import { IUser } from "../../domain/model/user";
import { DatabaseConnection } from "../../../../core/infra/database/connections/connection";
import { User } from "../../../../core/infra/database/entities/User";

export class UserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = DatabaseConnection.getConnection().manager.getRepository(User);
    }

    async create(user: IUser) {
        const userEntity = this.repository.create(user);
        await this.repository.save(userEntity);
    }

    async listAll() {
        return await this.repository.find({
            order: {
                nome: "ASC",
                username: "DESC"
            },
            where: {},
        });
    }

    async listOne(usernameKey: string) {
        const user = await this.repository.findOne(usernameKey);
        
        if(!user){
            throw Error('User does not exists');
        }

        return user;
    }

    async update(usernameKey: string, data: Partial<IUser>){
        const user = await this.repository.findOne(usernameKey);

        if(!user){
            throw Error('User does not exists');
        }

        await this.repository.update(usernameKey, {
            username: data.username ?? user.username,
            nome: data.nome ?? user.nome,
            cpf: data.cpf ?? user.cpf,
            idade: data.idade ?? user.idade
        });

    }

    async delete(usernameKey: string){
        const user = await this.repository.findOne(usernameKey);

        if(!user){
            throw Error('User does not exists');
        }

        await this.repository.delete(usernameKey);

    }
}
