import { ApiProperty } from "@nestjs/swagger";

export class CreateInstanceWhatsappDto {
    @ApiProperty()
    InstanceName: string;
    @ApiProperty()
    UserTelegramId: number;
}
