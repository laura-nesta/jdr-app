import { connect } from "react-redux";
import "./inscription.css";

import Wizard from "../../component/wizard/wizard";

function Inscription(props) {
  return (
    <>
      <div class="global-container">
        <Wizard></Wizard>
      </div>
    </>
  );
}

export default connect()(Inscription);
