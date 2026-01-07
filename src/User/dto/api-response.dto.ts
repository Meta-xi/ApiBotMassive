import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class ApiResponseDto {
    @ApiProperty({
        enum: [HttpStatus.OK, HttpStatus.NOT_FOUND],
        description: 'Código de estado HTTP'
    })
    statusCode: HttpStatus;
}
