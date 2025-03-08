import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import style from "./form.module.css";
import Button from "react-bootstrap/Button";
import CvTable from "../FormTable";
import { email, phoneNum, checkUrl} from "../Regex";

function CvForm() {
  const initialValues = {
    fullName: "",
    email: "",
    phoneNumber: "+994",
    imgUrl: "",
    experience: "",
  };

  const [form, setForm] = useState(initialValues);
  const [data, setData] = useState([]);
  const [error, setError] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    imgUrl: "",
    experience: "",
  });

  const inputChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    setError((prevError) => ({
      ...prevError,
      [inputName]: "",
    }));

    setForm((prevForm) => ({
      ...prevForm,
      [inputName]: inputValue,
    }));
  };

  const validationForm = () => {
    const newErrors = {};

    if (!email(form.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!phoneNum(form.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number.";
    }

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }
    if (!form.experience.trim()) {
      newErrors.experience = "Experience is required.";
    }

    if (!checkUrl(form.imgUrl)) {
      newErrors.imgUrl = "Wrong format please enter valid url";
    }

    setError(newErrors); 
    console.log("Validation errors:", newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validationForm()) {
      setData((prevData) => [...prevData, form]);
      setForm(initialValues);
     
   
  }}

  return (
    <>
      <div className={style.form_background}>
        <h1>Cv Form</h1>
        <br />
        <Form className="w-100 mx-auto table-sm">
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Control
              type="text"
              placeholder="Enter Fullname"
              onChange={inputChange}
              name="fullName"
              value={form?.fullName}
            />
            {error.fullName && <p style={{ color: "red" }}>{error.fullName}</p>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={inputChange}
              name="email"
              value={form?.email}
            />
            {error.email && <p style={{ color: "red" }}>{error.email}</p>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupPhone">
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              onChange={inputChange}
              name="phoneNumber"
              value={form?.phoneNumber}
            />
            {error.phoneNumber && (
              <p style={{ color: "red" }}>{error.phoneNumber}</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupUrl">
            <Form.Control
              type="url"
              placeholder="Enter image URL"
              onChange={inputChange}
              name="imgUrl"
              value={form?.imgUrl}
            />
            {error.imgUrl && <p style={{ color: "red" }}>{error.imgUrl}</p>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupExperience">
            <Form.Control
              type="text"
              placeholder="Enter experience"
              onChange={inputChange}
              name="experience"
              value={form?.experience}
            />
            {error.experience && (
              <p style={{ color: "red" }}>{error.experience}</p>
            )}
          </Form.Group>

          <Button variant="outline-warning" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
      <br />
      <br />
      <CvTable data={data} />
    </>
  );
}

export default CvForm;
