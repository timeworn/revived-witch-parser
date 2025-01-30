import { RWUtils } from "../../utils/RWUtils";
import { RWTexts } from "../../utils/RWTexts";
import { RWAudio } from "./RWAudio";
import {
  ICAudioPlayerCellData,
  ItemAmount,
} from "src/interfaces/CharacterInterfaces";

export class RWMusicBox extends RWAudio {
  id: number;
  name: number;
  author: number;
  album: number;
  albumImg: number;
  itemsNeeded: ItemAmount[];

  constructor(audioCell: ICAudioPlayerCellData) {
    super(RWUtils.getSoundSource(audioCell.audioID));

    this.id = audioCell.id;
    this.name = audioCell.audioName;
    this.author = audioCell.author;
    this.album = audioCell.album;
    this.albumImg = audioCell.albumImg;
    this.itemsNeeded = RWUtils.createItemAmount(
      audioCell.unlockItems,
      audioCell.itemsAmount,
    );
  }

  static getMusic() {
    return RWUtils.getAudioPlayerCellData().map(
      (audioCell) => new RWMusicBox(audioCell),
    );
  }

  getName() {
    return RWTexts.getWordYard(this.name) ?? "?";
  }

  getArtist() {
    return RWTexts.getWordYard(this.author) ?? "?";
  }

  getAlbumName() {
    return (
      RWTexts.getWordYard(RWUtils.getAudioPlayerAlbum(this.album).albumName) ??
      "?"
    );
  }

  getAlbumImg() {
    return RWUtils.getRWAssetImage(this.albumImg);
  }

  getAlbum() {
    return { name: this.getAlbumName(), icon: this.getAlbumImg() };
  }

  getItemsNeeded() {
    return RWUtils.createItemWithAmount(this.itemsNeeded);
  }
}
