import {SlashState, initialSlashState} from './slash.state';
import {SlashAction} from './slash.actions';

export function reduceSlashState(state:SlashState, action:SlashAction):SlashState {
    if (!state) {
        return initialSlashState;
    }

    
    return state;
}
