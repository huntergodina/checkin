const formToJSON= elements => {
  const reducerFunction = (data, element) => {
    data[element.name] = element.value;
    return data;
  };

  const reducerInitialValue = {};
  const formData = [].reduce.call(elements, reducerFunction, reducerInitialValue);

  console.log(formData.firstName + ' ' + formData.lastName);

  return formData;
};

const handleFormSubmit = event => {
  event.preventDefault();
  const data = formToJSON(form.elements);

  const dataContainer = document.getElementById('results__display');
  dataContainer.textContent = `Welcome, ${data.firstName} ${data.lastName}!`;
};


const form = document.getElementById('form');
form.addEventListener('submit', handleFormSubmit);
