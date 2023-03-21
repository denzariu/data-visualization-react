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
    console.log(frequencyOfPair)
    return frequencyOfPair;
}

export function getBigrams(text:string): Map<string, number> {
    let textReplica: string = text;

    const textToReplace: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '!', '.', ',', '\'', '"', '/', '@', ':', '+', '\\', '?', '#', '$', '&', '(', ')', '[', ']']
    textToReplace.forEach(element => {
        textReplica = textReplica.replaceAll(element, '');
    });

    let pairFrequency: Map<string, number> = nextLetterProbability(textReplica); 

    return pairFrequency;
}

export function getMaxFrequency(bigram: Map<string, number> | undefined): number {
    
    if (!bigram) return 1;

    let max_freq = 1;

    bigram.forEach(val => {
        if (val > max_freq)
            max_freq = val;
    })
    console.log(max_freq)
    return max_freq;
}

export function getColorForFrequency (frequency: number, max_freq: number): string {
    if (frequency === 0) 
      return '#fff';
    
    const hue = (frequency / max_freq) * 120;
    return `hsl(${hue}, 100%, 50%)`;
  };

  export function getWidth (frequency: number, max_freq: number): string {
    if (frequency === 0) 
      return `0rem`;
    
    const width = (frequency / max_freq) * 0.8;
    return `${width}rem`;
  };