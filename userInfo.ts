export type UserInfo = {
  id: number;
  status: string;
  lightTheme:boolean;
  notification:boolean
};

export const InitUser = {
    id: 123,
    status: "All",
    lightTheme:true,
    notification:false
  };