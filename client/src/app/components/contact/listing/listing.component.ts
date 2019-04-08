import { Component, OnInit } from '@angular/core';
import { ContactApiService } from '../../../data/contact-api.service';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  // List of contacts
  contactList: Contact[] = [];

  constructor(private contactApi: ContactApiService) { }

  ngOnInit() {
    this.loadContacts();
  }

  // Get all contacts
  loadContacts() {
    this.contactApi.getAll().subscribe(res => {
      this.contactList = res;
    });
  }

  // Delete contact by ID
  deleteContact(id) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.contactApi.delete(id).subscribe(() => {
        this.loadContacts();
      });
    }
  }
}
