import React from 'react';
import { useFormData } from '../utilities/useFormData';
import './CourseEditor.css'

const validateCourseData = (key, val) => {
  switch (key) {
    case 'title':
      return val.length >= 2 ? '' : 'must be at least two characters';
    case 'meets':
      const regex = /^(M|Tu|W|Th|F|Sa|Su){1,3} \d{1,2}:\d{2}-\d{1,2}:\d{2}$/



      return val === '' || regex.test(val) ? '' : 'must contain days and start-end, e.g., MWF 12:00-13:20';
    default:
      return '';
  }
};

const InputField = ({ name, label, state, change }) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{label}</label>
    <input
      className={`form-control ${state.errors?.[name] ? 'is-invalid' : ''}`}
      id={name}
      name={name}
      value={state.values?.[name] || ''}
      onChange={change}
    />
    <div className="invalid-feedback">{state.errors?.[name]}</div>
  </div>
);


const ButtonBar = ({ onCancel }) => (
  <div>
    <button type="button" className="button" onClick={onCancel}>Cancel</button>
    <button type="submit" className="button">Save Changes</button>
  </div>
);

const CourseEditor = ({ course, onClose }) => {
  const [formState, change] = useFormData(validateCourseData, course);

  const submit = (evt) => {
    evt.preventDefault();
    if (Object.keys(formState.errors).length === 0) {
      console.log('Form submitted:', formState.values);
      // Uncomment the next line to perform the update
      // update(`/courses/${course.code}`, formState.values);
      onClose(); // Call onClose to close the modal after saving
    }
    onClose(); 
  };

  return (
    <form onSubmit={submit} noValidate className={formState.errors ? 'was-validated' : null}>
      <InputField name="term" label="Term" state={formState} change={change} />
      <InputField name="number" label="Course Code" state={formState} change={change} />
      <InputField name="title" label="Title" state={formState} change={change} />
      <InputField name="meets" label="Meeting Times" state={formState} change={change} />
      <ButtonBar onCancel={onClose} />
    </form>
  );
};

export default CourseEditor;
