import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-advanced-search-dialog',
  templateUrl: './advanced-search-dialog.component.html',
  styleUrls: ['./advanced-search-dialog.component.css']
})
export class AdvancedSearchDialogComponent implements OnInit {

  private accomodationTypes : any[] = [];
  private accomodationCategories : any[] = [];
  private bonusFeatures : any[] = [];

  constructor(private searchService : SearchService, public dialogRef: MatDialogRef<AdvancedSearchDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getAccomodationTypes();
    this.getAccomodationCategories();
    this.getBonusFeatures();
  }

  zatvori = function(){
    this.dialogRef.close(null);
  }

  potvrdi = function(){
    this.dialogRef.close(this.data);
  }

  getAccomodationTypes(){
    this.searchService.getAllAccomodationTypes().subscribe((res:any)=>{
        if(res.success){
            this.accomodationTypes = res.responseBody;
        }
    })
}

getAccomodationCategories(){
    this.searchService.getAllAccomodationCategories().subscribe((res:any)=>{
        if(res.success){
            this.accomodationCategories = res.responseBody;
        }
    })
}

getBonusFeatures(){
    this.searchService.getAllBonusFeatures().subscribe((res:any)=>{
        if(res.success){
            this.bonusFeatures = res.responseBody;
        }
    })
}

bindAccomodationType(accomodationType: any){
    var index = this.containsElement(this.data.selectedAccomodationTypes, accomodationType);
    if(index==-1){
        this.data.selectedAccomodationTypes.push(accomodationType);
    }else{
        this.data.selectedAccomodationTypes.splice(index,1);
    }
  }

  bindAccomodationCategory(accomodationCategory: any){
    var index = this.containsElement(this.data.selectedAccomodationCategories, accomodationCategory);
    if(index==-1){
      this.data.selectedAccomodationCategories.push(accomodationCategory);
    }else{
      this.data.selectedAccomodationCategories.splice(index,1);
    }
  }

  bindBonusFeatures(bonusFeature: any){
    var index = this.containsElement(this.data.selectedBonusFeatures, bonusFeature);
    if(index==-1){
      this.data.selectedBonusFeatures.push(bonusFeature);
    }else{
      this.data.selectedBonusFeatures.splice(index,1);
    }
  }

  containsElement(list:any[],element:any):number{
    var index = 0;
    for(let e of list){
      if(e.id==element.id){
        return index;
      }
      index++;
    }
    return -1;
  }

}
