// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addContact, deleteContact, filterContact } from 'redux/sliceContacts';
// import { ContactList } from './ContactList/ContactList';
// import Container from './Container/Container';
// import Filter from './Filter/Filter';
// import { Form } from './Form/Form';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Container from './Container/Container';
import { addContact, deleteContact, filterContact } from 'redux/index';

const App = () => {
  const dispatch = useDispatch();

  const { contacts, filter } = useSelector(state => state);

  const isDuplicate = name => {
    return contacts.find(contact => contact.name === name);
  };

  const onHandleSubmit = data => {
    if (isDuplicate(data.name)) {
      alert(`this ${data.name} is already in your contacts!`);
      return;
    }
    dispatch(addContact(data));
  };

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const toFilteInput = e => {
    dispatch(filterContact(e.currentTarget.value));
  };

  const filteredContact = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  return (
    <Container>
      <h1>Phonebook</h1>
      <Form onSubmit={onHandleSubmit} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={toFilteInput} />
      <ContactList data={filteredContact} delateContact={onDeleteContact} />
    </Container>
  );
};
export default App;
