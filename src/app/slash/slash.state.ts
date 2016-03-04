import {Slash} from './slash.model';

export interface SlashState {
    current:Slash;
    list:Slash[];
    loading:boolean;
}

export let initialSlashState:SlashState = {
    current: null,
    list: [],
    loading: false
};
