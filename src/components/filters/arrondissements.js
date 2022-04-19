import Multi from './Multi'
import arrondissements from './arrondissements.json'

const { riveDroite, riveGauche, centreVille, parisEst } = arrondissements.areas

const allArrondissements = arrondissements.all
allArrondissements.sort()

const arrondissementFilter = {
  name: 'arrondissements',
  component: Multi,
  groupedOptions: [riveDroite, riveGauche, centreVille, parisEst],
  options: allArrondissements,
}

export default arrondissementFilter
