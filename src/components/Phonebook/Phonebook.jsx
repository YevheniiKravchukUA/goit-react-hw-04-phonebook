import { useEffect, useState, useRef } from 'react';
import { Section } from 'components/Section/Section';
import { PhonebookForm } from 'components/Phonebook/PhonebookForm/PhonebookForm';
import { ContactsList } from 'components/Phonebook/ContactsList/ContactsList';
import { Filter } from 'components/Phonebook/Filter/Filter';

import { getContactsFromLocaleStorage } from 'js/utils/getContactsFromLocaleStorage';
import { setContactsToLocaleStorage } from 'js/utils/setContactsToLocalStorage';

export function Phonebook() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const firstRender = useRef(true);

  useEffect(() => {
    if (window.localStorage.contacts) {
      setContacts(getContactsFromLocaleStorage());
    }
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setContactsToLocaleStorage(contacts);
  }, [contacts]);

  function addContact(contact) {
    const itsAlreadyAdded = contacts.find(el => el.name === contact.name);

    if (itsAlreadyAdded) {
      window.alert(`${contact.name} is already in contacts.`);
      return;
    } else {
      setContacts(ps => [...ps, contact]);
    }
  }

  function deleteContact(nameForDelete) {
    setContacts(ps => ps.filter(el => el.name !== nameForDelete));
  }

  function onFilterChange(e) {
    setFilter(e.target.value);
  }

  function filterContacts() {
    return contacts.filter(el => {
      return el.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  return (
    <>
      <Section title="Phonebook">
        <PhonebookForm addContact={addContact} />
      </Section>
      {contacts.length > 0 ? (
        <Section title="Contacts">
          <Filter filterValue={filter} onFilterChange={onFilterChange} />
          <ContactsList
            contacts={filterContacts()}
            deleteContact={deleteContact}
          />
        </Section>
      ) : (
        'Please, add first contact!'
      )}
    </>
  );
}
