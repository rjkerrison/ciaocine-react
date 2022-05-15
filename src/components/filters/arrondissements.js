import Multi from './Multi'
import arrondissements from './arrondissements.json'

const { riveDroite, riveGauche, centreVille, parisEst } = arrondissements.areas

const allArrondissements = arrondissements.all
allArrondissements.sort()

const arrondissementFilter = {
  name: 'arrondissements',
  label: 'Lieu',
  component: Multi,
  groupedOptions: [riveDroite, riveGauche, centreVille, parisEst],
  options: allArrondissements,
  getShortDisplay: (params) => {
    if (params.arrondissements) {
      const areas = []
      const chosenArrondissements = new Set(params.arrondissements.split('|'))

      for (let area of Object.values(arrondissements.areas)) {
        if (area.options.every((o) => chosenArrondissements.has(o))) {
          areas.push(area.label)
          area.options.forEach((o) => chosenArrondissements.delete(o))
        }
      }

      const labels = [...chosenArrondissements].map(
        (code) => allArrondissements.find(({ value }) => value === code).label
      )

      return [...areas, ...labels].join(', ')
    }
    return `N'importe quel arrondissement`
  },
}

export default arrondissementFilter
