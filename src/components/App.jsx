import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNewContacts, fetchContacts, deleteApiContact } from 'redux/thanks';

import { Form } from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Container from './Container/Container';
import { filterContact } from 'redux/index';

const App = () => {
  const dispatch = useDispatch();

  const { contacts, filter } = useSelector(state => state);

  const isDuplicate = name => {
    return contacts.items.find(contact => contact.name === name);
  };

  const onHandleSubmit = data => {
    if (isDuplicate(data.name)) {
      alert(`this ${data.name} is already in your contacts!`);
      return;
    }
    console.log(data);
    dispatch(addNewContacts(data));
  };
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const onDeleteContact = id => {
    dispatch(deleteApiContact(id));
  };

  const toFilteInput = e => {
    dispatch(filterContact(e.currentTarget.value));
  };

  const filteredContact = contacts.items.filter(contact =>
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
