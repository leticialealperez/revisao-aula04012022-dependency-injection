import { IProject } from "../../../project/domain/model/project";

export interface IUser {
    nome: string;
    username: string;
    cpf: string;
    idade?: number;
    project?: IProject[];
}
