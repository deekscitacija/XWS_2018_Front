import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
    name : 'destinationNamePipe'
})

export class DestinationNamePipe implements PipeTransform
{
    transform(destination : any) : string{
        var retVal : string = "";
        if(destination.country!=null){
            retVal+=destination.country.name;
        }else if(destination.city!=null){
            retVal+=destination.city.name+(destination.city.postcode!=null ? ", "+destination.city.postcode : "")+", "+destination.city.country.name;
        }
    
        return retVal;
    }

}