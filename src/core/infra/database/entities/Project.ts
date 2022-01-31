import {BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import { IProject } from "../../../../features/project/domain/model/project";
import { v4 as uuid} from 'uuid';
import { User } from "./User";

@Entity()
export class Project implements IProject {
    @PrimaryColumn({
        type: "uuid",
    })
    uid: string;
    
    @Column({
        length: 30,
        nullable: false
    })
    name: string;
    
    @Column({
        length: 100,
        nullable: true
    })
    description: string;
    
    @Column({
        nullable: true
    })
    startDate: Date;

    @Column({
        nullable: true
    })
    endDate: Date;

    @CreateDateColumn({
        nullable: false
    })
    created_at: Date;

    @ManyToOne(() => User, (user) => user.project)
    @JoinColumn({name: 'username'})
    user: string;


    @BeforeInsert()
    private beforeInsert(){
        console.log('before insert');
        this.uid = uuid();
    }

}
