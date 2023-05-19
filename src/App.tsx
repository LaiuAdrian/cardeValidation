import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Row, Col } from "react-bootstrap";
function App() {
  const [iban, setIban] = useState("");

  const [updatedIban, setupdatedIban] = useState(iban);

  const [valid, setValid] = useState<boolean>(false);

  const [stateMsg, setStateMsg] = useState<any>([]);

  const handleChange = (event: any) => {
    setIban(event.target.value);
  };

  const checkMaxIban = () => {
    const checkMaxChar = iban.length;

    if (checkMaxChar === 22) {
      return true;
    } else {
      messajHistory("Invalid 22 characters", iban, false);
      return false;
    }
  };

  const checkCountryME = () => {
    const countryME: string = iban.slice(0, 2);
    if (countryME === "ME") {
      return true;
    } else {
      messajHistory("INBALID ME", iban, false);
      return false;
    }
  };

  const checkControlNumber = () => {
    const controlNumber: string = iban.slice(2, 4);
    const controlNumberConvertor: number = parseInt(controlNumber);

    if (controlNumberConvertor === 25) {
      return true;
    } else {
      messajHistory("Control Number Invalid", iban, false);
      return false;
    }
  };

  const checkBankCode = () => {
    const bankCode: string = iban.slice(4, 7);
    const bankCodeConvertor: number = parseInt(bankCode);

    if (bankCodeConvertor === 505) {
      return true;
    } else {
      messajHistory("Invalid Bank Code", iban, false);
      return false;
    }
  };

  const checkNationNumber = () => {
    const nationalNumber: string = iban.slice(20, 22);
    const bankCodeConvertor: number = parseInt(nationalNumber);

    if (bankCodeConvertor === 51) {
      return true;
    } else {
      messajHistory("Invalid National Number", iban, false);
      return false;
    }
  };

  const handleClick = () => {
    setupdatedIban(iban);

    if (
      checkMaxIban() &&
      checkCountryME() &&
      checkControlNumber() &&
      checkBankCode() &&
      checkNationNumber()
    ) {
      messajHistory("IBAN VALID", iban, true);
    } else {
      setValid(true);
    }
    createHistoryIban();
    setIban("");
  };

  const messajHistory = (mesaj: string, iban: any, status: boolean) => {
    const msg: any = { mesaj: mesaj, iban: iban, status: status };

    if (localStorage.getItem("listIban") === null) {
      localStorage.setItem("listIban", JSON.stringify([msg]));
    } else {
      let locals: any = localStorage.getItem("listIban");
      let arrayMSG: any = JSON.parse(locals);

      let newLocals: any = JSON.stringify([...arrayMSG, msg]);
      localStorage.setItem("listIban", newLocals);
    }
    showMessajeIban();
  };

  const showMessajeIban = () => {
    let localsShowMessajeIban: any = localStorage.getItem("listIban");
    let listlocalsShowMessajeIban: any = JSON.parse(localsShowMessajeIban);
    setStateMsg(listlocalsShowMessajeIban);
  };

  useEffect(() => {
    if (localStorage.getItem("listIban") !== null) {
      showMessajeIban();
    }
  }, []);

  const createHistoryIban = () => {
    let newIbanHistory: any = [iban];

    localStorage.setItem("HistoryIban", JSON.stringify([iban]));
  };

  return (
    <>
      <Container
        className="mt-5"
        fluid="md"
      >
        <Row>
          <Col>
            <h1>ME25505000012345678951</h1>
            <input
              type="text"
              id="iban"
              name="iban"
              onChange={handleChange}
              value={iban}
            />
            <h2>iban: {iban}</h2>
            <h2>updatedIban: {updatedIban}</h2>
            <button onClick={handleClick}>Update</button>
          </Col>
          <Col>
            <ul>
              {stateMsg?.map((item: any, index: number) => (
                <li key={index}>
                  <div>
                    <p>{item.mesaj}</p>
                    <p>{item.iban}</p>
                    <p> {item.status ? "TRUE" : "FALSE"}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Col>
          <Col>
            <div>
              {valid ? (
                <div className="alertEroare">
                  <h2>Error!</h2>
                </div>
              ) : null}
            </div>
          </Col>
        </Row>
      </Container>

      <Container></Container>
    </>
  );
}

export default App;
