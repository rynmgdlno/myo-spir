import { useState } from "react";

import { Button } from "../button";
import { Input, TextArea } from "../formInput";

export const ReferralForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { name, email, subject, message } = formData;

  const handleChange = e => {
    const { name: state, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [state]: value
    }));
  };

  return (
    <div className="formContainer">
      <h4
      >{`Hey There Pard'ner! Got some questions? Don't hesitate to reach out!`}</h4>
      <form>
        <div className="dualField">
          <Input
            label="Your Name:"
            name="name"
            onChange={handleChange}
            value={name}
          />
          <Input
            label="Email Address:"
            name="email"
            onChange={handleChange}
            value={email}
            autocomplete="email"
          />
        </div>
        <div className="singleField">
          <Input
            label="Subject:"
            name="subject"
            onChange={handleChange}
            value={subject}
          />
        </div>
        <TextArea
          label="Message:"
          name="message"
          onChange={handleChange}
          value={message}
        />
        <div className="buttonContainer">
          <Button className="submitButton">Submit</Button>
        </div>
      </form>
    </div>
  );
};
