import {Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn} from "typeorm";
import { IProject } from "../../../../features/project/domain/model/project";
import { IUser } from "../../../../features/user/domain/model/user";
import { Project } from "./Project";

@Entity()
export class User implements IUser {
    @PrimaryColumn({
        length: 20
    })
    username: string;
    
    @Column({
        length: 30,
        nullable: false
    })
    nome: string;
    
    @Column({
        length: 11,
        nullable: false
    })
    cpf: string;
    
    @Column({
        nullable: true
    })
    idade: number;

    @OneToMany(() => Project, project => project.username)
    project?: IProject[];

    @CreateDateColumn()
    created_at: Date;
}
