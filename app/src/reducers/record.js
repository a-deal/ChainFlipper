import { EventActions } from '@drizzle/store'

export default function(
    state = { wins: 0, losses: 0, predictions: {} },
    action
) {
    if (action.type === EventActions.EVENT_FIRED) {
        const { returnValues: eventDetails } = action.event
        if (
            action.event.event === 'LogPrediction' &&
      !(eventDetails._queryId in state.predictions)
        ) {
            state.predictions[eventDetails._queryId] = +eventDetails._prediction
        }

        if (
            action.event.event === 'LogResult' &&
      eventDetails._queryId in state.predictions
        ) {
            let won =
        state.predictions[eventDetails._queryId] === +eventDetails._result

            delete state.predictions[eventDetails._queryId]
            state = {
                wins: won ? state.wins + 1 : state.wins,
                losses: !won ? state.losses + 1 : state.losses,
                predictions: state.predictions,
            }
        }
    }
    return state
}
