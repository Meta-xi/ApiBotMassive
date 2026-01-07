import { ApiProperty } from "@nestjs/swagger";
export class MessageContent{
    @ApiProperty({required: false , })
    texto?: string;
    @ApiProperty({required: false , })
    media?: any;
}
export class CreateConfigurationMessage{
    @ApiProperty()
    chat_id: number;
    @ApiProperty()
    ids_destino: string[];
    @ApiProperty()
    mensaje: MessageContent; 
    @ApiProperty()
    intervalo: number;
}