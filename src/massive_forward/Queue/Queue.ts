import { Injectable } from "@nestjs/common";
import { Massive_Forward } from "../entities/massive_forward.entity";

export interface IQueueList{
    id: number,
    list: Massive_Forward[];
}
@Injectable()
export class QueueListService{
    private queue : IQueueList[] = [];
    enqueue(list: Massive_Forward[]){
        if(this.queue.length === 0)
        this.queue.push({
            id : 0,
            list : list
        });
        else{
            const maxQueue = this.queue.reduce((min , current) => current.id > min.id ? current: min , this.queue[0]);
            this.queue.push({
                id: maxQueue.id +1,
                list: list
            });
        }
        this.queue.sort((a,b) => a.id - b.id);
    }
    dequeue(){
        return this.queue.shift();
    }
    isEmpty(){
        if(this.queue.length === 0){
            return true;
        }
        return false;
    }
}
@Injectable()
export class QueueSendMessage{
    private queue : Massive_Forward[] = [];
    private enabled : boolean = false;
    enqueue(config : Massive_Forward){
        this.queue.push(config);
    }
    dequeue(){
        return this.queue.shift();
    }
    isEmpty(){
        if(this.queue.length === 0){
            return true;
        }
        return false;
    }
    getEnabled(){
        return this.enabled;
    }
    setEnabled(state: boolean){
        this.enabled = state;
    }
}