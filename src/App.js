import Index from './Components/Index';
import CreateNew from './Components/NewForm/CreateNew';
import AllForms from './Components/Forms/All Forms/AllForms'
import OneForm from './Components/Forms/oneForm/OneForm';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/create-new" element={<CreateNew />} />
          <Route path="/all-forms" element={<AllForms />} />
          <Route path="/all-forms/:formId" element={<OneForm />} />
        </Routes >
      </Router>
    </div>
  );
}

export default App;
