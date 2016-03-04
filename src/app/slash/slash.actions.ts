import {Slash} from './slash.model';

export class LoadSlashesAction {}
export class LoadingSlashesAction {}
export class LoadedSlashesAction {
    constructor(public slashes:Slash[]) {}
}

export type SlashAction = LoadSlashesAction | LoadingSlashesAction | LoadedSlashesAction;