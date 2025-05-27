export type ResourceRow = {
  id: number;
  title: string;
  description: string;
  rating: number;
  lat: number;  // TODO: lat has a lot of decimals, will this hold up?
  long: number;

  maps_url: string;
  website: string;
  phone: string;  // ! Phone is of type STRING! bc of 954-206 dash!
  updated_at: string;  // TODO: convert to Date later!

  time_open: string;
  demographic: string;
  resource_type: string;
  address: string | null,
};

// Adding schema map for dynamic/scalable validator update
// NOTE: uses TypeScript mapped type!
const ResourceRowSchema: { [K in keyof ResourceRow]: 'string' | 'number'} = {
  id: 'number',
  title: 'string',
  description: 'string',
  rating: 'number',
  lat: 'number',
  long: 'number',

  maps_url: 'string',
  website: 'string',
  phone: 'string', 
  updated_at: 'string',

  time_open: 'string',
  demographic: 'string',
  resource_type: 'string',
  address: 'string',
};

export function returnValidatedResourceRowArr(data: any[]): undefined | ResourceRow[] {
  const rrArr: ResourceRow[] = [];
  // ! WARNING: const val OF data! NOT const val IN data
  for (const val of data) {
    const rr:undefined | ResourceRow = returnValidatedResourceRow(val);
    if (!rr) {  // Check if ALL rows are valid
      console.error("ERROR: this specific row in given supabase.data is invalid!", val)
      return undefined;
    }
    rrArr.push(rr);
  }
  // INVARIANT: ALl resource rows are valid, return ResourceRow[]
  return rrArr;
}

// Validation technique to cast supabase.data's any[0]/any[1]/... to a ResourceRow!
// Note: dataVal is just one value from data: any[]
// Similar to CSE331 ParseAuction! (Auction was also a type)
export function returnValidatedResourceRow(dataVal: any): ResourceRow | undefined {
  for (const key in ResourceRowSchema) {
    const expectedType = ResourceRowSchema[key as keyof ResourceRow]
    if (typeof dataVal[key] !== expectedType) {
      console.error(`ERROR: Invalid typing for ${key}! | Expected: ${expectedType}, Actual: ${typeof dataVal[key]}`);
      return undefined;
    }
  }
  // Invariant: Validity passed
  return dataVal as ResourceRow;
}



export function resourceRowToString(rr: ResourceRow) : string {
  const kvPairs = Object.entries(rr);  // 2-d array of entry kv pairs
  return kvPairs.map(([key, value]) => {return `${key} : ${value}`}).join();  // Convert arr to string
}