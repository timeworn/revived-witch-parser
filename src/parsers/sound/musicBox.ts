import { createRewardItems, getAssetImage } from "src/utils/utils";
import { AudioParser } from "src/parsers/sound/audio";
import { AudioPlayerCell, RawAudioPlayerCell, RawAudio } from "src/types/sound.model";
import cAudioPlayerCellJson from "src/data/courtyard/caudioplayercell.json";
import cAudioPlayerAlbumJson from "src/data/courtyard/caudioplayeralbum.json";

export class MusicBoxParser extends AudioParser {
  static getRaws(): RawAudioPlayerCell[] {
    return Object.values(cAudioPlayerCellJson.Data);
  }

  static getRaw(id: number): RawAudioPlayerCell | undefined {
    const raws = MusicBoxParser.getRaws();
    return raws.find((raw) => raw.id === id);
  }

  // @ts-expect-error
  transform(raw: RawAudioPlayerCell): AudioPlayerCell {
    return {
      ...super.transform(AudioParser.getRaw(raw.audioID) as RawAudio),
      name: this.localizer.localize(raw.audioName),
      album: this.getAlbumName(raw),
      albumImage: getAssetImage(raw.albumImg),
      artist: this.localizer.localize(raw.author),
      itemsNeeded: createRewardItems(raw.unlockItems, raw.itemsAmount),
    };
  }

  private getAlbumName(raw: RawAudioPlayerCell) {
    const album = cAudioPlayerAlbumJson.Data[raw.album as unknown as keyof typeof cAudioPlayerAlbumJson.Data];
    return this.localizer.localize(album.albumName.toString());
  }
}
