import React from "react";
import { useStoreState } from "easy-peasy";
import { Link } from "react-router-dom";

export const Batches = () => {
  const { lessors } = useStoreState((state) => state.lessor);
  const { tenants } = useStoreState((state) => state.tenant);
  let { batches } = useStoreState((state) => state.batch);

  batches = batches
    .map((b) => {
      const { lastName } = tenants.filter((t) => t.id === b.tid)[0];

      b.tenantLastName = lastName;

      return b;
    })
    .sort((a, b) => {
      if (a.tenantLastName < b.tenantLastName) {
        return -1;
      } else if (a.tenantLastName > b.tenantLastName) {
        return 1;
      } else {
        return 0;
      }
    });

  return (
    <>
      <div className="row">
        <h1 className="col s12">Lots</h1>
      </div>

      {!lessors.length || !tenants.length ? (
        <p className="row">
          <Link className="col s12" to="/bailleurs">
            Vous devez d'abord ajouter un bailleurs et un locataire pour pouvoir
            ajouter un lot
          </Link>
        </p>
      ) : (
        <>
          <div className="row">
            <Link className="col s12" to="/ajouter-lot">
              Ajouter un lot
            </Link>
          </div>

          <ul className="row">
            {batches.map((batch) => (
              <li key={batch.id} className="card-content white-text col s12 m4">
                <div className="card blue-grey darken-1">
                  <div className="card-content white-text">
                    <span className="green">ok</span>
                    <span className="red">!!</span>
                    <span className="card-title">
                      {batch.name} {batch.tenantLastName}
                    </span>

                    <ul className="card-action">
                      <li>
                        <Link to={`/lot/${batch.id}/avis-echeance`}>
                          Avis d'échéance
                        </Link>
                      </li>
                      <li>
                        <Link to={`/lot/${batch.id}/reception-paiement`}>
                          Réception paiement
                        </Link>
                      </li>
                      <li>
                        <Link to={`/lot/${batch.id}`}>
                          {/* Voir le détail ou  */}
                          Supprimer
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};
