export class Message{
type!: 'Success' | 'Danger'
text!:string

constructor(messageType:'Success' | 'Danger',messageText:string){
  this.type=messageType
  this.text=messageText
}

}

