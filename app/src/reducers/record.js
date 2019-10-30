import {
  EVENT_FIRED,
  PREDICTION_MADE,
  PREDICTION_LOGGED,
  RESULT_LOGGED,
} from "../constants"

const OUTCOMES = ["tails", "heads"]

function Flip(opts = FLIP_RECORD) {
  return Object.assign({}, FLIP_RECORD, opts)
}

const FLIP_RECORD = {
  prediction: "",
  result: "",
}

const FLIP_INITIAL_STATE = {
  ...FLIP_RECORD,
  underway: false,
}

const RECORD_INITIAL_STATE = {
  wins: 0,
  losses: 0,
  queryHistory: {},
  currentFlip: FLIP_INITIAL_STATE,
}

const updateRecord = (queryId, current) => {
  const { prediction, result } = current.queryHistory[queryId]
  if (prediction.length && result.length) {
    const updated = Object.assign({}, current)
    updated.wins += +(result === prediction)
    updated.losses += +(result !== prediction)
    if (updated.currentFlip.underway) {
      updated.currentFlip = new Flip({ underway: false })
    }
    return updated
  }
  return current
}

const handleLogEvent = (queryId, event, eventValue, current) => {
  const record = Object.assign({}, current)

  if (
    queryId in record.queryHistory &&
    !record.queryHistory[queryId][event].length
  ) {
    record.queryHistory[queryId][event] = OUTCOMES[eventValue]
    return updateRecord(queryId, record)
  } else if (!(queryId in record.queryHistory)) {
    record.queryHistory[queryId] = new Flip({ [event]: OUTCOMES[eventValue] })
    return record
  }

  return current
}

export default function(state = RECORD_INITIAL_STATE, action) {
  if (action.type === PREDICTION_MADE) {
    return {
      ...state,
      currentFlip: Object.assign(new Flip(), { underway: true }),
    }
  }

  if (action.type === EVENT_FIRED) {
    if (action.event.event === PREDICTION_LOGGED) {
      const { _queryId, _prediction } = action.event.returnValues
      return handleLogEvent(_queryId, "prediction", _prediction, state)
    }

    if (action.event.event === RESULT_LOGGED) {
      const { _queryId, _result } = action.event.returnValues
      return handleLogEvent(_queryId, "result", _result, state)
    }
  }
  return state
}
