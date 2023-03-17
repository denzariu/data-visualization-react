export function getDate(): string {

    const monthNames: Array<string> = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    let currentTime: Date = new Date();
    let currentDate: string = (currentTime.getDate().toString() + ' of ' + monthNames[currentTime.getMonth()] + ' ' + currentTime.getFullYear().toString()).toString();

    
    return currentDate;
}

export function getBigrams(text:string): string {

    /*
    text_to_replace = ['!', '.', ',', '\'', '"', '@', ':', '+', '\\', '?', '#', '$', '&', '(', ')', '[', ']']
    for character in text_to_replace:
        text.replace(character, '')
    */
    let textReplica:string = text;

    const textToReplace: Array<string> = ['!', '.', ',', '\'', '"', '\/', '@', ':', '+', '\\', '?', '#', '$', '&', '(', ')', '[', ']']
    textToReplace.forEach(element => {
        textReplica = textReplica.replaceAll(element, '');
    });

    return textReplica;
}