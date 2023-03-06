import { useState } from 'react';
import PropTypes from 'prop-types';
import css from 'components/Phonebook/PhonebookForm/PhonebookForm.module.css';

export function PhonebookForm({ addContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  function onFormChange(e) {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  }

  function onFormSubmit(e) {
    e.preventDefault();

    addContact({ name, number });
    clearFormInputs();
  }

  function clearFormInputs() {
    setName('');
    setNumber('');
  }

  return (
    <form className={`${css.form}`} onSubmit={onFormSubmit}>
      <label className={`${css.label}`}>
        Name
        <input
          className={`${css.input}`}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={onFormChange}
        />
      </label>
      <label className={`${css.label}`}>
        Number
        <input
          className={`${css.input}`}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={onFormChange}
        />
      </label>
      <button className={`${css.button}`} type="submit">
        Add contact
      </button>
    </form>
  );
}

PhonebookForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
