import { MessageContent } from "./Message_configuration.dto";

export interface MessageBack{
    idUserTelegram : number;
    sessionToken : string;
    mensaje : MessageContent;
    ids_destino : string[];
}