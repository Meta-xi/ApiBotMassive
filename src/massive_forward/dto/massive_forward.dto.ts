import { ApiProperty } from "@nestjs/swagger";
import { MessageContent } from "src/configuracion-mensaje/Message_configuration.dto";

export class Create_Massive_Forward{
    @ApiProperty()
    chat_id: number;
    @ApiProperty({ type: [String]})
    ids_destino: string[];
    @ApiProperty()
    caption : string;
    @ApiProperty()
    intervalo: number;
    @ApiProperty({ type: 'string', format: 'binary', required: false }) 
    imagen?: any;
}