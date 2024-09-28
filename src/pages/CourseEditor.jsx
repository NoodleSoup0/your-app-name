import React from 'react';
import { useFormData } from '../utilities/useFormData';

const InputField = ({ name, label, value, onChange }) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{label}</label>
    <input
      className="form-control"
      id={name}
      name={name}
      value={value || ''}
      onChange={onChange}
    />
  </div>
);

const ButtonBar = ({ onCancel }) => (
  <div>
    <button type="button" style={buttonStyle} onClick={onCancel}>Cancel</button>
    <button type="submit" style={buttonStyle}>Save Changes</button>
  </div>
);

const CourseEditor = ({ course, onClose }) => {
  const [formState, change] = useFormData(null, course); // No validation for now

  const submit = (evt) => {
    evt.preventDefault();
    console.log('Form submitted:', formState.values);
    onClose(); // Call onClose to close the modal after saving
  };

  return (
    <form onSubmit={submit} noValidate>
      <InputField name="term" label="Term" value={formState.values?.term} onChange={change} />
      <InputField name="number" label="Course Code" value={formState.values?.number} onChange={change} />
      <InputField name="title" label="Title" value={formState.values?.title} onChange={change} />
      <InputField name="meets" label="Meeting Times" value={formState.values?.meets} onChange={change} />
      <ButtonBar onCancel={onClose} />
    </form>
  );
};

export default CourseEditor;
