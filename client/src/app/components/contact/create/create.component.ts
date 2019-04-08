import { ContactApiService } from './../../../data/contact-api.service';
import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  // Input data for contact
  @Input() contact: Contact = new Contact();

  constructor(private contactApi: ContactApiService, private router: Router) { }

  ngOnInit() {
  }

  // Create new contact
  createContact() {
    this.contactApi.create(this.contact).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  // Go back to listing page
  back() {
    this.router.navigate(['/']);
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = this.handleFile.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleFile(event) {
    const binaryString = event.target.result;
    this.contact.photo = btoa(binaryString);
  }
}
