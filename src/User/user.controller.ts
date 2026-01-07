import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put , Res, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./user.entity";
import { UpdateUser } from "./dto/UpdateUser";
import { Response } from 'express';
import { AuthService } from "src/auth/auth.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@ApiTags('Users')
@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(private userService: UserService,
        private authService: AuthService
    ) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        const user = await this.userService.create(createUserDto);
        const jwt = await this.authService.login(user);
        if(!user) {
            return res.status(HttpStatus.OK).json({
                message: 'Usuario conectado exitosamente',
                token : jwt.access_token
            });
        }
        return res.status(HttpStatus.OK).json({
            message: 'Usuario conectado exitosamente',
            token : jwt.access_token
        });
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Return all users', type: [User] })
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a user by ID' })
    @ApiResponse({ status: 200, description: 'Return the user', type: User })
    @ApiResponse({ status: 404, description: 'User not found' })
    async findOne(@Param('id', ParseIntPipe) id: string, @Res() res: Response) {
        const user = await this.userService.findOne(id);
        if (!user) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: 'Usuario no encontrado'
            });
        }
        return res.status(HttpStatus.OK).json({
            message: 'Usuario encontrado',
            data: user
        });
    }

    @Get('telegram/:id')
    @ApiOperation({ summary: 'Get a user by Telegram ID' })
    @ApiResponse({ status: 200, description: 'Return the user', type: User })
    @ApiResponse({ status: 404, description: 'User not found' })
    async findByTelegramId(@Param('id', ParseIntPipe) idUserTelegram: number): Promise<User> {
        return await this.userService.findByTelegramId(idUserTelegram);
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    async updateTelegramSession(@Body() updateUserDto: UpdateUser , @Res() res : Response) {
        const user = await this.userService.Update(updateUserDto);
        if(!user){
            return res.status(HttpStatus.NOT_FOUND).json({
                message: 'El usuario no existe'
        });
        }
        return res.status(HttpStatus.OK).json({
            message: 'Usuario desconectado exitosamente'
        })
    }
    @Get('StringSession/:idUserTelegram')
    @UseGuards(JwtAuthGuard)
    async getStringSession(@Param('idUserTelegram',ParseIntPipe) idUserTelegram: number, @Res() res : Response){
        const user = await this.userService.findByTelegramId(idUserTelegram);
        if(user === null){
            return res.status(HttpStatus.NOT_FOUND).json({
                message : 'El usuario no se encuentra conectado en el bot'
            });
        }
        return res.status(HttpStatus.OK).json({
            stringSession : user.sesionToken
        });
    }
}