export interface myInfo {
  user: {
    name: string;
    id: string;
    avatar: string;
    email: string;
  };

  exp: number;
  iat: number;
}


export interface Room {
  description: string;
  id: string;
  name: string;
  __typename: string;
}
