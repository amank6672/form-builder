import FormBuilder from './components/FormBuilder/FormBuilder';
import { formConfig } from './util';

function App() {

  const onSubmitListner = (formData) => {
    console.log('Form submitted', formData);
  }

  return (
    <div className="App">
      <FormBuilder formConfig={formConfig} onSubmitListner={onSubmitListner} />
    </div>
  );
}

export default App;
