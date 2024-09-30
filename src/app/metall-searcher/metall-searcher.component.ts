import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LanguageService } from '../services/language.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DirectoryService } from '../services/directory.service';
import { MetallSearchService } from '../services/metall-search.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-metall-searcher',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './metall-searcher.component.html',
  styleUrl: './metall-searcher.component.scss',
})
export class MetallSearcherComponent implements OnInit {
  currentlanguage: string = '';
  nameObject: string = '';
  countries: any = [];
  types: any = [];
  statuses: any = [];
  showLang: string = 'РУС';
  form: FormGroup;
  formToAdd: FormGroup;
  pageNumber: number = 1;
  pageSize: number = 10;
  totalPages!: number;
  show = false;
  showForm = false;
  showFormEdit = false;
  response: any;
  selectedTypeId !:any;
  editing = false;
  formToEdit: FormGroup;
  idToEdit!: number;

  constructor(
    private translateService: TranslateService,
    private languageService: LanguageService,
    private directoryService: DirectoryService,
    private metalSearchService: MetallSearchService,
    private fb: FormBuilder
  ) {
    translateService.setDefaultLang('ru');
    this.form = this.fb.group({
      name: [''],
      type: [''],
    });

    this.formToAdd = this.fb.group({
      brand: ['', Validators.required],
      yearIssue: ['', Validators.required],
      count: ['', Validators.required],
      countryManufactureId: ['', Validators.required],
      availabilityId: ['', Validators.required],
      typeMetalDetectorsId: ['', Validators.required],
    });

    this.formToEdit = this.fb.group({
      brand: ['', Validators.required],
      yearIssue: ['', Validators.required],
      count: ['', Validators.required],
      countryManufactureId: ['', Validators.required],
      availabilityId: ['', Validators.required],
      typeMetalDetectorsId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.currentlanguage = this.languageService.getCurrentLanguage();
    console.log('currentlanguage', this.currentlanguage);

    this.getCountries();
    this.getTypes();
    this.getStatus();
  }

  getCountries() {
    this.directoryService.getCountryManufactureOfMetalDetectors().subscribe(
      (res) => {
        this.countries = res;
        console.log(this.countries);
      },
      (error) => {
        console.error('An error occurred while fetching projects', error);
      }
    );
  }

  getTypes() {
    this.directoryService.getTypesMetalDetectors().subscribe(
      (res) => {
        this.types = res;
        console.log(this.types);
      },
      (error) => {
        console.error('An error occurred while fetching projects', error);
      }
    );
  }

  getStatus() {
    this.directoryService.getAvailabilityOfMetalDetectors().subscribe(
      (res) => {
        this.statuses = res;
        console.log(this.statuses);
      },
      (error) => {
        console.error('An error occurred while fetching projects', error);
      }
    );
  }

  switchLang(lang: string): any {
    this.translateService.use(lang);
    localStorage.setItem('currentlanguage', lang);
    this.currentlanguage = lang;
    if (lang === 'ru') {
      this.translateService.use('ru');
      localStorage.setItem('currentlanguage', 'ru');
      this.showLang = 'РУС';
    }
    if (lang === 'kz') {
      this.translateService.use('kz');
      localStorage.setItem('currentlanguage', 'kz');
      this.showLang = 'ҚАЗ';
    }
  }

  findMetalSearcher() {
    const nameValue = this.form.get('name')?.value;
    console.log('nameValue',nameValue)
    this.metalSearchService
      .findByNameOfMetallSearching(nameValue, this.pageNumber, this.pageSize)
      .subscribe((res) => {
        this.response = res.content;
        console.log(this.response)
      });
  }

  filterByType(typeValue : number) {
    
    this.metalSearchService
      .filterDataByTypeOfMetallSearching(
        typeValue,
        this.pageNumber,
        this.pageSize
      )
      .subscribe((res) => {
        this.response = res.content;
      });
  }

  addNewOne() {
    if (this.formToAdd.valid) {
      const formToAddValues = this.formToAdd.value;
      this.metalSearchService
        .addingDataInTableOfMetallSearching(
          formToAddValues.brand,
          formToAddValues.yearIssue,
          formToAddValues.count,
          formToAddValues.countryManufactureId,
          formToAddValues.availabilityId,
          formToAddValues.typeMetalDetectorsId
        )
        .subscribe(
          (res) => {
            alert('Data added successfully');
            this.formToAdd.reset();
            this.showForm = false; 
          },
          (error) => {
            
            alert('Error adding data');
          }
        );
    }
  }

  deleteDetector(id : number){
    confirm('sure?')
    this.metalSearchService.deletingDataInfMetallSearching(id).subscribe(
      (res) => {
        this.findMetalSearcher();
        alert('Data deleted successfully');
      },
      (error) => {
        
        alert('Error deleting data');
      }
    )
  }

  fillInfo(id : number){
    this.idToEdit = id;
    this.metalSearchService.seacrhingInMetallSearching(id).subscribe(
      (item) => {

        this.formToEdit.patchValue({
          brand: item.brand,
          yearIssue: item.yearIssue,
          count: item.count,
          countryManufactureId: item.countryManufactureId,
          availabilityId: item.availabilityId,
          typeMetalDetectorsId: item.typeMetalDetectorsId,
        });
        this.editing = true; 
        this.showFormEdit = true; 
      },
      (error) => {
        console.error('Error fetching the item for editing', error);
      }
    );
  }

  edit(id: number){
    if (this.formToEdit.valid) {
      const formToAddValues = this.formToEdit.value;
      this.metalSearchService.changingDataInMetallSearching(
        id,
        formToAddValues.brand,
        formToAddValues.yearIssue,
        formToAddValues.count,
        formToAddValues.countryManufactureId,
        formToAddValues.availabilityId,
        formToAddValues.typeMetalDetectorsId
      ).subscribe(
        (res) => {
          alert('Data updated successfully');
          this.formToAdd.reset(); 
          this.editing = false; 
          this.showForm = false; 
          this.findMetalSearcher(); 
        },
        (error) => {
          alert('Error updating data');
          console.error('Error updating data', error);
        }
      );
    }
  }

  close(){
    this.editing = !this.editing;
  }

  toggle() {
    this.show = !this.show;
  }

  addNewObject() {
    this.showForm = !this.showForm;
  }
}
