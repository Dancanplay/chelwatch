export interface Feed {
  feedName: string;
  feedId: number;
}

export class Match {
  homeTeam: string;
  awayTeam: string;
  status: string;
  gameDate: Date;
  feeds: Feed[];
}
