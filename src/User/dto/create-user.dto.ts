import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        description: 'ID del usuario en Telegram',
        example: 123456789
    })
    idUserTelegram: number;

    @ApiProperty({
        description: 'Token de sesión del usuario',
        example: 'abc123xyz789'
    })
    sesionToken: string;
}
