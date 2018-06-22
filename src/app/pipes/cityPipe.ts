import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
    name : 'cityPipe'
})

export class CityPipe implements PipeTransform
{
    transform(city : any) : string{
        if(!city){
            return "";
        }
        var retVal : string = city.name+(city.postcode!=null ? ", "+city.postcode : "")+", "+city.country.name;
    
        return retVal;
    }

}