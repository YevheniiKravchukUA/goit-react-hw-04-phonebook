import { UUID } from 'uuidjs';
import { useState } from 'react';
import { Section } from 'components/Section/Section';
import { PhonebookForm } from 'components/Phonebook/PhonebookForm/PhonebookForm';
import { ContactsList } from 'components/Phonebook/ContactsList/ContactsList';
import { Filter } from 'components/Phonebook/Filter/Filter';

import { useLocaleStorage } from 'hooks/useLocaleStorage';

export function Phonebook() {
  const [contacts, setContacts] = useLocaleStorage([]);
  const [filter, setFilter] = useState('');

  function addContact({ name, number }) {
    const itsAlreadyAdded = contacts.find(el => el.name === name);
    const id = UUID.generate();
    const contact = { id, name, number };

    if (itsAlreadyAdded) {
      window.alert(`${name} is already in contacts.`);
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
      <Section title="Contacts">
        {contacts.length === 0 && 'Please, add first contact!'}
        {contacts.length > 0 && (
          <>
            <Filter filterValue={filter} onFilterChange={onFilterChange} />
            <ContactsList
              contacts={filterContacts()}
              deleteContact={deleteContact}
            />
          </>
        )}
      </Section>
    </>
  );
}
