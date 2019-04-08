import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../models/contact';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

// Define Contact API base path
const apiURL = '/api/contact/';

// Http Options
const httpOptions = {
 headers: new HttpHeaders({
   'Content-Type': 'application/json'
 })
};

@Injectable({
  providedIn: 'root'
})
export class ContactApiService {
  constructor(private httpClient: HttpClient) { }

  // Get all contacts
  getAll(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(apiURL, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // Get contaact by id
  get(id: number): Observable<Contact> {
    return this.httpClient.get<Contact>(apiURL + id, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // Create new contact
  create(contact: Contact): Observable<Contact> {
    return this.httpClient.post<Contact>(apiURL, JSON.stringify(contact), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // Update existing contact
  update(id: number, contact: Contact): Observable<Contact> {
    return this.httpClient.put<Contact>(apiURL + id, JSON.stringify(contact), httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // Delete existing contact
  delete(id) {
    return this.httpClient.delete<Contact>(apiURL + id, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
