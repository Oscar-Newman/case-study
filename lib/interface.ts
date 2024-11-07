// interface for checking which UI form fields passed and failed to verify user input and return which fields failed to UI
export interface ErrorFields 
{
    [key: string]: string;
}