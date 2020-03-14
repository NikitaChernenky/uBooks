/* Import all libraries and services. */
import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/services/countries.service';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-admin-countries',
  templateUrl: './admin-countries.component.html',
  styleUrls: ['./admin-countries.component.css']
})

/* Module view using class. */
export class AdminCountriesComponent implements OnInit {

  /* Declaration of all variables. */
  countries: any = [];
  data: any = {};
  changingData: any = {};
  visibleForm: string = "";

  /* Using service. */
  constructor(private countriesService: CountriesService) { }

  /* Perform component initialization. */
  ngOnInit() {
    this.fetchData();
  }

  /* Load data to variable using countries service. */
  fetchData() {
    /* Load all data to variable using countries service. */
    this.countriesService.getAllCountries().subscribe(countries => {
      this.countries = countries;
    },
      err => {
        console.log(err);
      });
  }

  /* Reset create form after button clicking. */
  resetCreateForm() {
    this.data = {};
  }

  /* Reset update form after button clicking. */
  resetUpdateForm() {
    this.changingData = {};
  }

  /* Create a new country using service. Writing data to a database table. */
  createCountry() {
    /* Checking if data properties is not empty. */
    if (this.data.CountryName && this.data.CountryCode) {
      /* Checking if there are some countries with the same name or country code. */
      if (!this.countries.find(country => country.CountryName == this.data.CountryName || country.CountryCode == this.data.CountryCode)) {
        /* Add new data to the table of HTML-page. */
        let country = {
          CountryID: this.countries[this.countries.length - 1].CountryID + 1,
          CountryName: this.data.CountryName,
          CountryCode: this.data.CountryCode
        };
        this.countries.push(country);
        /* INSERT query to the countries table of the database */
        this.countriesService.insertCountry(country).subscribe(() => { this.fetchData(); });
        /* Hide adding form. */
        this.visibleForm = "";
      } else {
        alert("Country with this name or code exists!"); this.visibleForm = "";
      }
    } else {
      alert("Input field must not be empty"); this.visibleForm = "";
    }
  }

  /* Update country data using a service. */
  updateCountry() {
    /* Checking if data property is not empty. */
    if (this.changingData.CountryName) {
      /* Checking if there are some countries with the same name or country code. */
      if (!this.countries.find(country => (country.CountryName == this.changingData.CountryName || country.CountryCode == this.changingData.CountryCode) && country.CountryID != this.changingData.CountryID)) {
        /* UPDATE query to the countries table of the database */
        this.countriesService.updateCountry(this.changingData).subscribe(() => { this.fetchData(); });
        /* Update data of country. */
        for (var i = 0; i < this.countries.length; i++) {
          if (this.changingData.CountryID == this.countries[i].CountryID) {
            this.countries[i].CountryName = this.changingData.CountryName;
            this.countries[i].CountryCode = this.changingData.CountryCode;
          }
        }
        /* Hide updating form. */
        this.visibleForm = "";
      } else {
        alert("Country with this name or code exists!"); this.visibleForm = "";
      }
    } else {
      alert("Input field must not be empty!"); this.visibleForm = "";
    }
  }

  /* Get data from form for updating country data. */
  getCountryForUpdate(id) {
    /* Get country by ID from the database. */
    this.countriesService.getCountryByID(id).subscribe(country => {
      this.changingData.CountryID = country[0].CountryID;
      this.changingData.CountryName = country[0].CountryName;
      this.changingData.CountryCode = country[0].CountryCode;
    },
      err => {
        console.log(err);
      });
  }

  /* Remove selected country from database table. */
  deleteCountry(id) {
    /* DELETE query to the countries table of the database */
    this.countriesService.deleteCountry(id).subscribe(() => { this.fetchData(); });
    /* Delete table entry by ID of the country. */
    this.countries = this.countries.filter(country => country.CountryID != id);
  }
}
