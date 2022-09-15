import {
  postDismiss,
  postWant,
  postWatch,
} from '../../../api/movie-relationship'

const markAsWatched = (id, { title }, toast) => {
  postWatch(id).then(({ relationship }) => {
    console.log(relationship)
    toast(`Marked ${title} as watched`)
  })
}

const markAsDismissed = (id, { title }, toast) => {
  postDismiss(id).then(({ relationship }) => {
    console.log(relationship)
    toast(`Marked ${title} as dismissed`)
  })
}

const markAsWanted = (id, { title }, toast) => {
  postWant(id, 10).then(({ relationship }) => {
    console.log(relationship)
    toast(`Marked ${title} as wanted`)
  })
}

const markAs = {
  watched: markAsWatched,
  dismissed: markAsDismissed,
  wanted: markAsWanted,
}

export { markAs }
