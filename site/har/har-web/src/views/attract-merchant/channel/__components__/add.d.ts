export type EditForm = {
  id?: number;
  projectId?: number;
  code: string;
  type?: number;
  name: string;
  address: string;
  principalName: string;
  principalPost: string;
  principalPhone: string;
  attachment: string;
  attachmentPic?: Array<any>;
};
export type OtherItem = {
  id?: number;
  name?: string;
  post?: string;
  phone?: string;
};
