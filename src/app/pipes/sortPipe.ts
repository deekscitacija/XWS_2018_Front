import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortPipe'
})
export class BookingUnitSortPipe implements PipeTransform {

  transform(bookingUnits: any, args: string): any {

    if(args==='PriceAsc'){

        bookingUnits.sort((a: any, b: any) => {
        if (a.price < b.price) {
          return -1;
        } else if (a.price > b.price) {
          return 1;
        } else {
          return 0;
        }
      });

    }else if(args==='PriceDesc'){

        bookingUnits.sort((a: any, b: any) => {
        if (a.price > b.price) {
          return -1;
        } else if (a.price < b.price) {
          return 1;
        } else {
          return 0;
        }
      });
    }else if(args==='RatingAsc'){

      bookingUnits.sort((a: any, b: any) => {
      if (a.rating < b.rating) {
        return -1;
      } else if (a.rating > b.rating) {
        return 1;
      } else {
        return 0;
      }
    });
  }else if(args==='RatingDesc'){

    bookingUnits.sort((a: any, b: any) => {
    if (a.rating > b.rating) {
      return -1;
    } else if (a.rating < b.rating) {
      return 1;
    } else {
      return 0;
    }
  });
}else{
    bookingUnits.sort((a: any, b: any) => {
    if (a.bookingUnit.name < b.bookingUnit.name) {
      return -1;
    } else if (a.bookingUnit.name > b.bookingUnit.name) {
      return 1;
    } else {
      return 0;
    }
   });

    }

    return bookingUnits;
  }

}
