# revived-witch-parser

A parser for [Kimaris](https://github.com/lele394/Kimaris-archive)

Notes:

src/data/characters is the [excel data](https://github.com/lele394/Kimaris-archive/tree/main/game_data/GLOBAL/data/exceldata) found in Kimaris

getImageUrl() is not provided

---

## Usage

```javascript
const character = new RWCharacter(id)
const characters = RWCharacter.getCharacters()
const elements = RWCharacter.getElements()
const vocations = RWCharacter.getVocations()
```
