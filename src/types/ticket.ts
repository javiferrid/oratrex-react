export interface TicketT {
  id: string
  date: string
  eventName: string
  img: string
  status?: Status
  clientColor?: string
  gradientColor?: string
  type: string
  location: string
  time: string
}

export enum Option {
  UPCOMING = 'upcomingEvents',
  COLLECTIBLES = 'collectibles'
}

export enum Status {
  AWAITING = 'awaiting',
  ON_SALE = 'onSale',
  HOLDER_CHANGE = 'holderChange',
  WINNER = 'winner',
  LOSER = 'loser'
}
