import { MessageContent } from "./Message_configuration.dto";

export interface MessageBackToUpdate{
    idConfig: string;
    idUserTelegram : number;
    sessionToken : string;
    mensaje : MessageContent;
    ids_destino : string[];
    interval: number;
}