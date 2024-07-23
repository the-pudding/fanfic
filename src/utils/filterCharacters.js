export default function filterCharacters(data, characterPair, position) {
    // Finds the current character for each position
    const currLeftCharacter = data[characterPair[0]].character;
    const currRightCharacter = data[characterPair[1]].character;
    
    // Filters out current character from opposite position
    const leftFilteredData = data.filter(d => d.character !== currRightCharacter);
    const rightFilteredData = data.filter(d => d.character !== currLeftCharacter);

    if (position == "left") {
        return leftFilteredData
    } else {
        return rightFilteredData
    }
}
