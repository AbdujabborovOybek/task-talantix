import React, { useEffect, useState } from "react";
import "./Home.css";
import { FiTrash2 } from "react-icons/fi";
import { GrEdit } from "react-icons/gr";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

const api = "http://localhost:8080";
export const Home = () => {
  const [contacts, setContacts] = useState(null);
  const [update, setUpdate] = useState(false);
  const [contact, setContact] = useState(null);

  useEffect(() => {
    axios(`${api}/get/contact`)
      .then((res) => {
        setContacts(res?.data?.contact);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update]);

  const addContact = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const value = Object.fromEntries(formData);
    if (contact) {
      updateContact(String(contact.id), value);
      e.target.reset();
      setContact(null);
      return null;
    }

    const config = {
      method: "post",
      url: `${api}/add/contact`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: JSON.stringify(value),
    };

    axios(config)
      .then((res) => {
        const { message, variant } = res?.data;
        enqueueSnackbar(message, { variant });
        setUpdate(!update);
        e.target.reset();
      })
      .catch((err) => {
        const { error, variant } = err?.response?.data;
        enqueueSnackbar(error, { variant });
      });
  };

  const deleteContact = (id) => {
    const config = {
      method: "delete",
      url: `${api}/delete/contact/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then((res) => {
        const { message, variant } = res?.data;
        enqueueSnackbar(message, { variant });
        setUpdate(!update);
      })
      .catch((err) => {
        const { error, variant } = err?.response?.data;
        enqueueSnackbar(error, { variant });
      });
  };

  const updateContact = (id, data) => {
    const config = {
      method: "patch",
      url: `${api}/update/contact/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: JSON.stringify(data),
    };

    axios(config)
      .then((res) => {
        const { message, variant } = res?.data;
        enqueueSnackbar(message, { variant });
        setUpdate(!update);
      })
      .catch((err) => {
        console.log(err?.response?.data);
      });
  };

  return (
    <div className="home">
      <form className="home_form" onSubmit={addContact}>
        <h1>Добавить контакт</h1>
        <label>
          <input
            type="text"
            name="fullname"
            placeholder="Имя"
            autoComplete="off"
            defaultValue={contact?.fullname}
          />
        </label>
        <label>
          <input
            type="tel"
            name="phone"
            placeholder="Телефон"
            autoComplete="off"
            defaultValue={contact?.phone}
          />
        </label>
        <label>
          <button type="submit">
            {contact ? "Редактировать" : "Добавить"}
          </button>
        </label>
      </form>

      <div className="contacts">
        <h1>Список контактов</h1>

        <ol>
          {contacts?.map((contact) => {
            return (
              <li key={contact._id}>
                <p>
                  <span>{contact.fullname}</span>
                  <i>{contact.phone}</i>
                </p>

                <button onClick={() => setContact(contact)}>
                  <GrEdit />
                </button>
                <button onClick={() => deleteContact(contact.id)}>
                  <FiTrash2 />
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
