export interface RawBadge {
  colorID: number;
  description: string;
  descriptionTextID: number;
  id: number;
  imageID: number;
  name: string;
  nameTextID: number;
}

export interface Badge {
  id: number;
  name: string | null;
  description: string | null;
  image: string | null;
  group: string | null;
  colorId: number;
}
