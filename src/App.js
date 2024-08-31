import "./App.css";

import {
  redirect
} from "react-router-dom";


export async function loader() {
  return redirect(`/login`)
}

function App() {

  return (
    <div className={"App"}>

    </div>
  );
}

export default App;
