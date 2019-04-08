package com.contato.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.contato.models.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long> {

}