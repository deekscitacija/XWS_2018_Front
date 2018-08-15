export class Destination{
    private destinationId :string = "";
    private destinationName :string = "";
    private destinationType :string = "";

    constructor(destinationId : string, destinationName : string, destinationType : string){
        this.destinationId = destinationId;
        this.destinationName = destinationName;
        this.destinationType = destinationType;
    } 

    public getDestinationId() : string{
        return this.destinationId;
    }

    public getDestinationName() : string{
        return this.destinationName;
    }

    public getDestinationType() : string{
        return this.destinationType;
    }
}