import { GPT_35_TURBO, GPT_4 } from "../utils/constants";
import { Language } from "../utils/languages";


export const GPTModelNames= [GPT_35_TURBO, GPT_4]
export type GPTModelNames= "gpt-3.5-turbo" | "gpt-4"

export interface ModelSettings{
    language:Language;
    customApiKey:string;
    customModelName:GPTModelNames;
    customTemperature:number;
    customMaxLoops:number;
    maxTokens:number;
}
