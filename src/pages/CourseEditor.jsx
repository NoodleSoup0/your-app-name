import React from 'react';
import { useFormData } from '../utilities/useFormData';
import { useDbUpdate } from '../utilities/firebase'; // Import the useDbUpdate hook
import './CourseEditor.css';

const validateCourseData = (key, val) => {
  switch (key) {
    case 'title':
      return val.length >= 2 ? '' : 'must be at least two characters';
    case 'meets':
      const regex = /^(M|Tu|W|Th|F|Sa|Su){1,3} \d{1,2}:\d{2}-\d{1,2}:\d{2}$/;
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
  if (!course) {
    return <div>Loading...</div>;
  }

  const [formState, change] = useFormData(validateCourseData, course);
  const [updateCourse, result] = useDbUpdate(`courses/${course.id}`);

  const submit = async (evt) => {
    evt.preventDefault();

    const errors = formState.errors || {};

    console.log("if statement", Object.keys(errors).length === 0);

    if (Object.keys(errors).length === 0) {
      const hasChanged = Object.keys(formState.values).some(key => formState.values[key] !== course[key]);
      console.log('hasChanged', hasChanged);

      if (hasChanged) {
        try {
          await updateCourse(formState.values); // Update the course data in Firebase
          console.log('Form submitted:', formState.values);
          onClose(); // Close the modal after saving
        } catch (error) {
          console.error("Error saving data:", error);
        }
      } else {
        console.log('No changes to submit.');
      }
    }
  };

  return (
    <form onSubmit={submit} noValidate className={formState.errors ? 'was-validated' : null}>
      <InputField name="term" label="Term" state={formState} change={change} />
      <InputField name="number" label="Course Code" state={formState} change={change} />
      <InputField name="title" label="Title" state={formState} change={change} />
      <InputField name="meets" label="Meeting Times" state={formState} change={change} />
      <ButtonBar onCancel={onClose} />
      {result && result.error && <div className="alert alert-danger">{result.message}</div>}
      {result && !result.error && <div className="alert alert-success">{result.message}</div>}
    </form>
  );
};

export default CourseEditor;
