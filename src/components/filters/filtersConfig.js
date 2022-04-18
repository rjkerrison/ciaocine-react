import Multi from './Multi'
import Slider from './Slider'
import Toggle from './Toggle'

const riveDroiteArrondissements = [
  '75001',
  '75002',
  '75003',
  '75004',
  '75009',
  '75010',
  '75011',
  '75012',
  '75016',
  '75017',
  '75018',
  '75019',
  '75020',
]

const riveGaucheArrondissements = [
  '75005',
  '75006',
  '75007',
  '75013',
  '75014',
  '75015',
]

const allArrondissements = [
  ...riveDroiteArrondissements,
  ...riveGaucheArrondissements,
]
allArrondissements.sort()

const filters = [
  { name: 'ugcIllimiteOnly', component: Toggle, label: 'UGC Illimité' },
  {
    name: ['fromHour', 'toHour'],
    component: Slider,
    options: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
  },
  {
    name: 'arrondissements',
    component: Multi,
    groupedOptions: [
      {
        label: 'Rive Gauche',
        options: riveGaucheArrondissements,
      },
      {
        label: 'Rive Droite',
        options: riveDroiteArrondissements,
      },
    ],
    options: allArrondissements,
  },
]

export default filters
