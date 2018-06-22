import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
    name : 'ratingPipe'
})

export class RatingPipe implements PipeTransform
{
    transform(rating : any) : any{
        if(rating==0){
            return "Nije ocenjeno!";
        }else{
            return rating;
        }
    
    }

}