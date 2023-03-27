import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNewContacts, fetchContacts, deleteApiContact } from 'redux/thanks';

import { Form } from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Container from './Container/Container';

const App = () => {
  const dispatch = useDispatch();

  const { contacts } = useSelector(state => state);

  const isDuplicate = name => {
    return contacts.items.find(contact => contact.name === name);
  };

  const onHandleSubmit = data => {
    if (isDuplicate(data.name)) {
      alert(`this ${data.name} is already in your contacts!`);
      return;
    }
    dispatch(addNewContacts(data));
  };
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const onDeleteContact = id => {
    dispatch(deleteApiContact(id));
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <Form onSubmit={onHandleSubmit} />
      <h2>Contacts</h2>
      <Filter />
      <ContactList delateContact={onDeleteContact} />
    </Container>
  );
};

export default App;
