export default class MessageBasic{
    myMessage!:[]
    picture!:[]
    constructor(message:any){
        this.myMessage=message
    }
    getMessage(my:any){
        this.myMessage= my
    }
    getBasicMessage(){
       const message=this.myMessage
       return {
        message
       }
    }
}