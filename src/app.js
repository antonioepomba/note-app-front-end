import './app.css';
import AccountOverview from './account-overview';
//import { BrowserRouter, Route } from 'react-router-dom'
import LOGIN from './pages/Login';

function App() {
  const accountOverviewStub = {
    supportContact: {
      name: 'John Smith',
      email: 'john.smith@feefo.com'
    },
    salesOverview: {
      uploads: 8,
      successfulUploads: 3,
      linesAttempted: 20,
      linesSaved: 4,
      lastUploadDate: 1605001226079,
    }
  }


  return (
    <div className="App">
      <LOGIN/>
    </div>
  );
}

export default App;
