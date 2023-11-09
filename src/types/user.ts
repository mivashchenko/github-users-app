export type UserListItem = {
  id: number;
  avatar_url: string;
  login: string;
  name: string;
  followers: number;
  following: 0;
};

export type UserRepo = {
  id: number;
  name: string;
};

export type UserOrganization = {
  login: string;
};

export type UserFollowers = {
  login: string;
  name: string;
};
