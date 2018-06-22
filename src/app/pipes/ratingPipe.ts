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

            if(rating <= 5){
                return "Lose "+rating;
            }else if(rating > 5 && rating <=6){
                return "Solidno "+rating;
            }else if(rating > 6 && rating <= 7){
                return "Dobro "+rating;
            }else if(rating > 7 && rating <= 8){
                return "Jako dobro "+rating;
            }else if(rating > 8 && rating <= 9){
                return "Odlicno "+rating;
            }else if(rating>9){
                return "Vrhunsko "+rating;
            }
        }
    
    }

}