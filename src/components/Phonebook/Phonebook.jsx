import { useState } from 'react';
import { Section } from 'components/Section/Section';
import { PhonebookForm } from 'components/Phonebook/PhonebookForm/PhonebookForm';
import { ContactsList } from 'components/Phonebook/ContactsList/ContactsList';
import { Filter } from 'components/Phonebook/Filter/Filter';

import { useLocaleStorage } from 'hooks/useLocaleStorage';

export function Phonebook() {
  const [contacts, setContacts] = useLocaleStorage([]);
  const [filter, setFilter] = useState('');

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
