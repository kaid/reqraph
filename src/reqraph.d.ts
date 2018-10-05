export interface ReqraphItem {
  identity: string;
  requirements: string[];
}

export type Reqraph = Array<ReqraphItem>;
export type SortedReqraph = Array<Reqraph>;
