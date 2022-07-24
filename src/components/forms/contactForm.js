import { useEffect, useState } from "react";

import { getMessage } from "../../static/messages";

import { Button } from "../button";
import { Input, TextArea } from "../formInput";

export const ContactForm = props => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { name, email, subject, message } = formData;

  const [formState, setFormState] = useState({
    clicked: false,
    confirmation: false,
    error: null,
    fixForm: false,
    submitDisabled: true
  });
  const { clicked, confirmation, error, fixForm, submitDisabled } = formState;

  const handleInput = e => {
    const { name: state, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [state]: value
    }));
  };

  const handleForm = (state, val) => {
    setFormState(prevState => ({
      ...prevState,
      [state]: val
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleForm("clicked", true);
    if (!submitDisabled) {
      console.log("trying submit");
      try {
        fetch("api/mail", {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }).then(res => {
          console.log(res);
          if (res.status === 200) {
            handleForm("confirmation", true);
            setFormData({
              name: "",
              email: "",
              subject: "",
              message: ""
            });
          }
        });
      } catch (err) {
        handleForm("error", err.message);
      }
    } else {
      console.log(`submit is disabled`);
      handleForm("submitDisabled", true);
      handleForm("fixForm", true);
    }
  };

  useEffect(
    () => {
      if (
        (name && email && subject && message.length > 10) &&
        message.length < 200
      ) {
        handleForm("submitDisabled", false);
      } else {
        handleForm("submitDisabled", true);
      }
    },
    [name, email, subject, message]
  );

  const submitClass = !submitDisabled ? `submitButton` : `submitDisabled`;

  return (
    <div className="formContainer">
      <h4
      >{`Hey There Pard'ner! Got some questions? Don't hesitate to reach out!`}</h4>
      <form onSubmit={handleSubmit}>
        <div className="dualField">
          <Input
            label="Your Name:"
            name="name"
            onChange={handleInput}
            value={name}
          />
          <Input
            label="Email Address:"
            name="email"
            onChange={handleInput}
            value={email}
            autoComplete="email"
          />
        </div>
        <div className="singleField">
          <Input
            label="Subject:"
            name="subject"
            onChange={handleInput}
            value={subject}
          />
        </div>
        <TextArea
          label="Message:"
          name="message"
          onChange={handleInput}
          value={message}
        />
        <div className="buttonContainer">
          <Button className={submitClass} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
