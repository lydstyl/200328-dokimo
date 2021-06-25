import React from "react";
import { useParams } from "react-router-dom";
import { useStoreState } from "easy-peasy";

import { amount as funAmount } from "../../utils/utils";

export const PaymentDocument = () => {
  const { bid, id } = useParams();
  const { batches } = useStoreState((state) => state.batch);
  const batch = batches.filter((batch) => batch.id === bid)[0];
  const {
    lid,
    tid,
    address1: batchAddress1,
    address2: batchAddress2,
    postalCode: batchPostalCode,
    rent,
    charge,
  } = batch;

  const payment = batch.payments.filter((payment) => payment.id === id)[0];

  const {
    document: { type, term, amount },
    date,
    balance,
  } = payment;

  const { lessors } = useStoreState((state) => state.lessor);
  const lessor = lessors.filter((lessor) => lessor.id === lid)[0];
  const { companyName, managerFirstName, managerLastName } = lessor;

  const { tenants } = useStoreState((state) => state.tenant);
  const tenant = tenants.filter((tenant) => tenant.id === tid)[0];
  const { civility, firstName, lastName } = tenant;

  return (
    <div className="payment-doc">
      <div className="row">
        <h1 className="col s12 center-align">{type}</h1>
        <p className="col s12 center-align">
          <b>Période:</b> {term}
        </p>
        <p className="col s12 center-align">
          <b>Adresse du bien immobilier loué:</b> {batchAddress1}{" "}
          {batchAddress2} {batchPostalCode} {batch.townName}
        </p>
      </div>

      <div className="row table">
        <div className="col s12">
          <table className="">
            <thead>
              <tr>
                <th>
                  <b>Propriétaire</b>
                  <p>
                    {companyName
                      ? companyName.toUpperCase()
                      : managerLastName + " " + managerFirstName}
                  </p>
                </th>
                <th className="right">
                  Locataire{" "}
                  <p>
                    {civility} {firstName} {lastName}
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {type === "Quittance de loyer" && (
                <tr>
                  <td>Total loyer et charges reçus</td>
                  <td className="right">{funAmount(rent + charge)} €</td>
                </tr>
              )}

              {type === "Quittance de loyer" && balance < 0 && (
                <tr>
                  <td>Total du trop perçu à ce jour</td>
                  <td className="right">{funAmount(balance * -1)} €</td>
                </tr>
              )}

              {type === "Reçu partiel de loyer" && (
                <>
                  <tr>
                    <td>Total loyer et charges reçus</td>
                    <td className="right">{payment.amount} €</td>
                  </tr>
                  <tr>
                    <td>Rèste à payer</td>
                    <td className="right">{payment.restToPay} €</td>
                  </tr>
                </>
              )}

              {type === "Trop perçu de loyer" && (
                <>
                  <tr>
                    <td>Total loyer et charges reçus</td>
                    <td className="right">{payment.amount} €</td>
                  </tr>
                  <tr>
                    <td>Trop perçu</td>
                    <td className="right">{payment.toMuchPaid} €</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="row payment">
        <div className="col">
          {type === "Quittance de loyer" && (
            <>
              <p>
                Je soussigné {managerFirstName} {managerLastName}
                {companyName && `, gérant de ${companyName.toUpperCase()}`},
                propriétaire du logement désigné ci-dessus, déclare avoir reçu
                de la part du locataire l’ensemble des sommes mentionnées à
                titre du loyer et des charges.
              </p>

              <p>
                Cette quittance annule tous les reçus qui auraient pu être
                donnés pour acomptes versés au titre du loyer et des charges
                pour l’échéance correspondante. Le paiement de la présente
                quittance ne présume pas du paiement des termes précédents. A
                conserver 3 ans après échéance du bail.
              </p>
            </>
          )}

          {type === "Reçu partiel de loyer" && (
            <>
              <p>
                Je soussigné {managerFirstName} {managerLastName}
                {companyName && `, gérant de ${companyName.toUpperCase()}`},
                propriétaire du logement désigné ci-dessus, déclare avoir reçu
                de la part du locataire l’ensemble des sommes mentionnées à
                titre de paiement partiel du loyer et des charges.
              </p>

              <p>Ce reçu annule et remplace les précédents reçus.</p>

              <p>Ce reçu ne peut en aucun cas servir de quittance de loyer.</p>
            </>
          )}

          {type === "Trop perçu de loyer" && (
            <>
              <p>
                Je soussigné {managerFirstName} {managerLastName}
                {companyName && `, gérant de ${companyName.toUpperCase()}`},
                propriétaire du logement désigné ci-dessus, déclare avoir reçu
                de la part du locataire l’ensemble des sommes mentionnées à
                titre de paiement du loyer et des charges.
              </p>

              <p>Ce reçu annule et remplace les précédents reçus.</p>
            </>
          )}

          <p>
            Fait à {lessor.townName}, le {date}
          </p>

          <p className="right-align">Le bailleur</p>
        </div>
      </div>
    </div>
  );
};
