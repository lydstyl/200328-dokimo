import React, { useContext } from 'react'

import { actionTypes, RentReviewContext } from './RentReview'
import { Field } from './Field'

export const ReviewMailMaker = props => {
  const rentReviewContext = useContext(RentReviewContext)
  const { state, dispatch } = rentReviewContext

  return (
    <div className='row ren-review'>
      <div className='col s12 title'>
        <div className='row'>
          {/* <div className='col s12 title'> */}
          <div className='col-6 col-sm-4 title'>
            <h1> Révision de loyer</h1>
          </div>
        </div>

        {state && (
          <div className='row'>
            <form className='col l3 form'>
              <Field name={'sender'} />

              <Field name={'recipient'} />
            </form>

            <div className='col l9 mail'>
              <div className='sender'>
                <p>{state.sender}</p>
              </div>

              <div className='recipient-and-date'>
                <p>{state.recipient} | CIVILITÉ | | LOCATAIRE |</p>

                <p>à Raismes, le | DATE_COURRIER |</p>
              </div>

              <div className='object'>
                <p>Objet : Révision annuelle du loyer</p>
              </div>

              <div className='body'>
                <p>| CIVILITÉ |, </p>

                <p>
                  Conformément aux dispositions de votre bail, la valeur de
                  votre loyer est indexée sur l’évolution de l’| TYPE_INDICE |
                  de l’INSEE du | TRIMESTRE | trimestre de chaque année.{' '}
                </p>

                <p>
                  Récemment publié, cet indice s’établit désormais à | NI |.
                </p>

                <p>La formule de calcul de votre loyer est la suivante :</p>

                <p>
                  Nouveau loyer hors charges=Loyer hors charges Nouvel
                  indiceAncien indice
                </p>

                <p>
                  En conséquence, le montant de votre nouveau loyer hors charges
                  indexé est de | NLHC | € :
                </p>

                <p>| NLHC |=| LHC | | NI | | AI |</p>

                <p>
                  En ajoutant vos charges actuelles (| CHARGES | €) nous
                  obtenons votre nouveau loyer charges comprises: |
                  NOUVEAU_LOYER | €.
                </p>

                <p>
                  Cette augmentation prend effet dès à présent. Je vous remercie
                  de bien vouloir l’appliquer lors du règlement de votre
                  prochain loyer.{' '}
                </p>

                <p>
                  Je vous prie de bien vouloir agréer, | CIVILITÉ |,
                  l’expression de mes sentiments cordiaux.
                </p>
              </div>

              <div className='signature'>
                <p>| SIGNATURE |</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
