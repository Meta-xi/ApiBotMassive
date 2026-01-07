import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUser } from './dto/UpdateUser';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { idUserTelegram: createUserDto.idUserTelegram }});
        if(user){
            user.sesionToken = createUserDto.sesionToken;
            return await this.userRepository.save(user);
        }
        const newUser = this.userRepository.create({
            idUserTelegram: createUserDto.idUserTelegram,
            sesionToken: createUserDto.sesionToken
        });
        return await this.userRepository.save(newUser);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async findByTelegramId(idUserTelegram: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { idUserTelegram } });
        if (!user) {
            throw new NotFoundException(`User with Telegram ID ${idUserTelegram} not found`);
        }
        return user;
    }

    async Update(updateUserDto: UpdateUser): Promise<User | null> {
        const user = await this.userRepository.findOne({ 
            where: { idUserTelegram: updateUserDto.idUserTelegram } 
        });
        if(!user){
            return null;
        }
        user.sesionToken = updateUserDto.sesionToken;
        return await this.userRepository.save(user);
    }
}