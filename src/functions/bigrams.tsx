export function getDate(): string {

    const monthNames: Array<string> = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    let currentTime: Date = new Date();
    let currentDate: string = (currentTime.getDate().toString() + ' of ' + monthNames[currentTime.getMonth()] + ' ' + currentTime.getFullYear().toString()).toString();

    
    return currentDate;
}

function nextLetterProbability(text:string): Map<string, number> {
    let frequencyOfPair = new Map<string, number>();
    const textLength: number = text.length;

    for (let index:number = 0; index < textLength - 1; index++ ) {
        let pairOfLetters: string = text[index] + text[index + 1];

        let pair: number|undefined = frequencyOfPair.get(pairOfLetters);
        if (pair !== undefined)
            frequencyOfPair.set(pairOfLetters, pair + 1);
        else 
            frequencyOfPair.set(pairOfLetters, 1);
    }

    return frequencyOfPair;
}

export function getBigrams(text:string): Map<string, number> {
    let textReplica: string = text;

    const textToReplace: Array<string> = ['!', '.', ',', '\'', '"', '/', '@', ':', '+', '\\', '?', '#', '$', '&', '(', ')', '[', ']']
    textToReplace.forEach(element => {
        textReplica = textReplica.replaceAll(element, '');
    });

    let pairFrequency = nextLetterProbability(textReplica); 

    return pairFrequency;
}