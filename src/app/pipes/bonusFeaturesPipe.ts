import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bonusFeaturesPipe'
})
export class BonusFeaturesPipe implements PipeTransform {

  transform(value : any) : string{

    if(!value){
      return "";
    }

    var retVal : string = "";
    var i : number = 0;
    for(let bonusFeature of value){
        retVal += bonusFeature.name;
        i++;
        if(i<value.length){
            retVal+=", ";
        }        
    }

    return retVal;
  }

}