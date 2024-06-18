import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";

import { useFormErrors } from "./shared/form-error.hook";
import { IRootState } from "../redux/store";
import { contactService } from "../services/contact.service";
import { useToken } from "./auth/token.hook";
import { IContact } from "../models/contact";
import {
  addContactSuccess,
  deleteContact,
  editContactSuccess,
  fetchContactsAsync,
  setActiveContact,
} from "../redux/contact.slice";

const useContact = () => {
  const contacts = useSelector<IRootState, IContact[]>(
    (state) => state.contact.contacts
  );
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.contact.isLoading
  );
  const initialFetch = useSelector<IRootState, boolean>(
    (state) => state.contact.initialFetch
  );
  const contact = useSelector<IRootState, IContact>(
    (state) => state.contact.contact
  );

  const dispatch = useDispatch();
  const { setformError } = useFormErrors();
  const { token } = useToken();

  const loadContacts = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchContactsAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addContact = async (contact: IContact) => {
    return await contactService
      .create(contact)
      .then((contactResponse) => {
        dispatch(addContactSuccess(contactResponse.data));
        return true;
      })
      .catch((error) => {
        setformError(error);
        return false;
      });
  };

  const delContact = async (contact: IContact) => {
    return await contactService
      .delete(contact)
      .then((resp) => {
        console.log("resp: ", resp);
        dispatch(deleteContact(contact));
        return true;
      })
      .catch((error) => {
        console.log("error: ", error);
        return false;
      });
  };
  const setContact = (contact: IContact) => {
    dispatch(setActiveContact(contact));
  };

  const editContact = async (contact: IContact) => {
    return await contactService
      .update(contact)
      .then((contactResponse) => {
        dispatch(editContactSuccess(contactResponse.data));
        setContact(contactResponse.data);
        return true;
      })
      .catch((error) => {
        setformError(error);
        return false;
      });
  };

  useEffect(() => {
    // loadContacts();
  }, [contact, contacts, isLoading, initialFetch]);

  return {
    contact,
    contacts,
    isLoading,
    initialFetch,
    addContact,
    editContact,
    setContact,
    delContact
  };
};

export { useContact };
