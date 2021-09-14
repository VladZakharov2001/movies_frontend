import { Route, Router } from "react-router-dom";
import Authorization from "./components/authorization";
import Main from "./components/mainPages";
import GlobalStyle from "./global";
const App: React.FC = () => {
  return (
    <div>
      <GlobalStyle />
      <Route exact path="/" component={Main} />
      <Route exact path="/login" component={Authorization} />
    </div>
  );
};
export default App;
