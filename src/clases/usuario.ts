export class usuario{
    email:string;
    credito:number;
    code100:boolean;
    code50:boolean;
    code10:boolean;
    constructor(email:string){
      this.email=email;
      this.credito=0;
       this.code100=false;
       this.code50=false;
       this.code10=false;
    }
  
    dameJSON(){
      return JSON.parse( JSON.stringify(this));
    }
  }