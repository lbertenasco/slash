import {CommentComponent} from '../comment/comment.component';

export class Card {
  id: String;
  image: String;
  text: String;
  tags: any[];
  comments: CommentComponent[];

  constructor(data:any) {
    this.id    = data && data.id;
    this.text  = data && data.text;
    this.image = data && data.image && data.image.url;
  }
}
