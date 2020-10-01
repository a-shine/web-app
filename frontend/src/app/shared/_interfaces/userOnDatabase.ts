export interface UserOnDatabase {
    UserID: number;
    email: string;
    password: string;
    username: string;
    savedInformation: SavedInformation;
}

interface SavedInformation {
    settingsArray: SettingsArray;
    dashboardInformation: DashboardInformation;
}

// I have no idea how settings are stored, im guessing we dont make a setting object
interface SettingsArray extends Array<string> {
    tempSettings: string; // idk what format these are in, i guess json
}

interface DashboardInformation {
    toolArray: ToolArray;
}

interface ToolArray extends Array<Tool> {}
