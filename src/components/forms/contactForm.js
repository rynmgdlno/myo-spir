import { useEffect, useRef, useState } from "react";
import * as EmailValidate from "email-validator";

import { getMessage } from "../../static/messages";

import { Spinner } from "../svg/spinner";
import { Button } from "../button";
import { Input, TextArea } from "../formInput";

export const ContactForm = props => {
  const enterRef = useRef();
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
    isLoading: false,
    submitDisabled: true
  });
  const { clicked, confirmation, error, isLoading, submitDisabled } = formState;

  const [formErrors, setFormErrors] = useState({
    name: true,
    email: true,
    subject: true,
    message: true
  });

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

  const handleErrors = (state, val) => {
    setFormErrors(prevState => ({
      ...prevState,
      [state]: val
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleForm("clicked", true);
    if (!submitDisabled) {
      console.log("trying submit");
      handleForm("isLoading", true);
      try {
        const messageBody = {
          name,
          email,
          formatSubject: `CONTACT FORM: ${subject}`,
          message
        };
        fetch("api/mail", {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(messageBody)
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
            handleForm("isLoading", false);
            handleForm("clicked", false);
            // todo send auto reply mail
            handleForm("confirmation", true);
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

  // form error setting:
  useEffect(
    () => {
      if (!name) {
        handleErrors("name", true);
      } else {
        handleErrors("name", false);
      }
      if (!EmailValidate.validate(email)) {
        handleErrors("email", true);
      } else {
        handleErrors("email", false);
      }
      if (!subject) {
        handleErrors("subject", true);
      } else {
        handleErrors("subject", false);
      }
      if (!message) {
        handleErrors("message", true);
      } else {
        handleErrors("message", false);
      }
    },
    [name, email, subject, message]
  );

  // submit disabled handling:
  useEffect(
    () => {
      if (name && EmailValidate.validate(email) && subject && message.length) {
        handleForm("submitDisabled", false);
      } else {
        handleForm("submitDisabled", true);
      }
    },
    [name, email, subject, message]
  );

  const submitClass = !submitDisabled ? `submitButton` : `submitDisabled`;

  // Formatting input error message:
  let errorFields = Object.entries(formErrors).filter(
    ([_, value]) => value === true
  );
  const errorCount = errorFields.length;
  errorFields = errorFields
    .map(error => error[0])
    .toString()
    .split(",")
    .join(", ");
  const andIndex = errorFields.lastIndexOf(",");
  errorFields =
    errorCount > 1
      ? errorFields.substring(0, andIndex) +
        " &" +
        errorFields.substring(andIndex + 1)
      : errorFields;

  const formError = `There is an error in the form. Please check the ${errorFields} field(s) and try again.`;

  // setting input error to state error:
  useEffect(
    () => {
      if (errorCount > 0) {
        handleForm("error", formError);
      } else {
        handleForm("error", null);
      }
    },
    [errorCount, formError]
  );

  // enter key listener:
  useEffect(() => {
    const handleEnter = e => {
      if (e.keyCode === 13) {
        handleForm("clicked", true);
      }
    };
    enterRef.current.addEventListener("keydown", handleEnter);
    let refHolder = enterRef;
    return () => {
      refHolder.current.removeEventListener("keydown", handleEnter);
    };
  }, []);

  // set timeout for resetting confirmation message:
  useEffect(
    () => {
      if (confirmation) {
        const timer = setTimeout(() => {
          handleForm("confirmation", false);
        }, 5000);
        return () => {
          clearTimeout(timer);
        };
      }
    },
    [confirmation]
  );

  return (
    <div className="formContainer">
      {confirmation
        ? <div>
            <h3>Thank you for your interest!</h3>
            <p>{`I'll be getting back to you as soon as possible.`}</p>
          </div>
        : <div>
            <h4
            >{`Hey There Pard'ner! Got some questions? Don't hesitate to reach out!`}</h4>
            <form onSubmit={handleSubmit} ref={enterRef}>
              <div className="dualField">
                <Input
                  checkError={!name}
                  error={clicked && !name}
                  label="Your Name:"
                  onChange={handleInput}
                  name="name"
                  value={name}
                />
                <Input
                  autoComplete="email"
                  checkError={!EmailValidate.validate(email)}
                  error={clicked && !EmailValidate.validate(email)}
                  label="Email Address:"
                  onChange={handleInput}
                  name="email"
                  value={email}
                />
              </div>
              <div className="singleField">
                <Input
                  checkError={!subject}
                  error={clicked && !subject}
                  label="Subject:"
                  onChange={handleInput}
                  name="subject"
                  value={subject}
                />
              </div>
              <TextArea
                checkError={!message}
                error={clicked && !message}
                label="Message:"
                onChange={handleInput}
                name="message"
                value={message}
              />
              <div className="buttonContainer">
                {isLoading
                  ? <Spinner className="spinnerContainerComponent"/>
                  : <Button className={submitClass} type="submit">
                      Submit
                    </Button>}
              </div>
              {clicked &&
                error &&
                <p>
                  {formError}
                </p>}
            </form>
          </div>}
    </div>
  );
};
