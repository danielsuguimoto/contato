package com.contato.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.io.IOException;
import java.io.FileOutputStream;
import java.io.File;
import org.apache.commons.io.FileUtils;
import java.util.Base64;

import com.contato.models.Contact;
import com.contato.repositories.ContactRepository;

@RestController
public class ContactController {

    private final ContactRepository repository;

	ContactController(ContactRepository repository) {
		this.repository = repository;
	}

    @GetMapping("/contact")
	List<Contact> getAll() {
		return repository.findAll();
	}

    @GetMapping("/contact/{id}")
    public Contact get(@PathVariable long id) {
        Contact contact = repository.findById(id).get();
		try {
			File file = new File("photo_" + contact.getId() + ".jpg");
			if (file.exists()) {
				byte[] fileContent = FileUtils.readFileToByteArray(file);
				String encodedString = Base64.getEncoder().encodeToString(fileContent);
				contact.setPhoto("data:image/jpg;base64, " + encodedString);
			}
		} catch (IOException e) {}
		return contact;
    }

    @PostMapping("/contact")
	Contact create(@RequestBody Contact contact) {
		Contact newContact = repository.saveAndFlush(contact);
		if (newContact.getPhoto() != "") {
			this.uploadContactPhoto(newContact.getPhoto(), newContact.getId());
		}
		return newContact;
	}

    @PutMapping("/contact/{id}")
	Contact update(@RequestBody Contact contact, @PathVariable long id) {

		return repository.findById(id)
			.map(c -> {
				c.setFirstName(contact.getFirstName());
				c.setLastName(contact.getLastName());
                c.setEmail(contact.getEmail());
                c.setPhoneNumber(contact.getPhoneNumber());
                c.setTwitter(contact.getTwitter());
                c.setSkype(contact.getSkype());

				if (contact.getPhoto() != "" ){
					this.uploadContactPhoto(contact.getPhoto(), id);
				}
				return repository.save(c);
			})
			.orElseGet(() -> {
				contact.setId(id);
				return repository.save(contact);
			});
	}

    @DeleteMapping("/contact/{id}")
	void delete(@PathVariable long id) {
		repository.deleteById(id);
	}

	private void uploadContactPhoto(String file, long id) {
		try {
			//This will decode the String which is encoded by using Base64 class
            byte[] imageByte = Base64.getDecoder().decode(file);
            String imagePath = "photo_" + id + ".jpg";
			FileOutputStream outputStream = new FileOutputStream(imagePath);
            outputStream.write(imageByte);
			outputStream.close();
		} catch (IOException e) {}
	}
}