import { ContactApiService } from './../../../data/contact-api.service';
import { Contact } from './../../../models/contact';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  id: number = this.actRoute.snapshot.params.id;
  contact: Contact = new Contact();
  constructor(private contactApi: ContactApiService, private actRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // Get contact by ID
    this.contactApi.get(this.id).subscribe(data => {
      this.contact = data;
    });
  }

  // Update contact data
  updateContact() {
    if (window.confirm('Are you sure you want to update?')) {
      this.contactApi.update(this.id, this.contact).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
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
