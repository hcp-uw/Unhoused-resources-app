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
  resource_type_id: number;
  updated_at: string;  // TODO: convert to Date later!
};

// Validation technique to cast supabase.data's any[0]/any[1]/... to a ResourceRow!
// Note: dataVal is just one value from data: any[]
// Similar to CSE331 ParseAuction! (Auction was also a type)
export function returnValidatedResourceRow(dataVal: any): undefined | ResourceRow {
  const isValid:boolean = 
    typeof dataVal.id === 'number' &&
    typeof dataVal.title === 'string' && 
    typeof dataVal.description === 'string' && 
    typeof dataVal.rating === 'number' && 
    typeof dataVal.lat === 'number' && 
    typeof dataVal.long === 'number' && 
    typeof dataVal.maps_url === 'string' && 
    typeof dataVal.website === 'string' && 
    typeof dataVal.phone === 'string' && 
    typeof dataVal.resource_type_id === 'number' && 
    typeof dataVal.updated_at === 'string';  // to be convt to Date later

  if (!isValid) {
    console.error("Error: given dataVal could not be validated to ResourceRow!", dataVal);
    return undefined
  } else {
    const rr:ResourceRow = {
      id: dataVal.id,
      title: dataVal.title,
      description: dataVal.description,
      rating: dataVal.rating,
      lat: dataVal.lat,
      long: dataVal.long,
      maps_url: dataVal.maps_url,
      website: dataVal.website,
      phone: dataVal.phone,
      resource_type_id: dataVal.resource_type_id,
      updated_at: dataVal.updated_at,
    }
    return rr;
  }
}

export function returnValidatedResourceRowArr(data: any[]): undefined | ResourceRow[] {
  const rrArr: ResourceRow[] = [];
  // ! WARNING: const val OF data! NOT const val IN data
  for (const val of data) {
    const rr:undefined | ResourceRow = returnValidatedResourceRow(val);
    if (!rr) {  // Check if ALL rows are valid
      console.error("Error: this specific row in given supabase.data is invalid!", val)
      return undefined;
    }
    rrArr.push(rr);
  }
  // INVARIANT: ALl resource rows are valid, return ResourceRow[]
  return rrArr;
}

export function resourceRowToString(rr: ResourceRow) : string {
  return `
    Title: ${rr.title}
    Description: ${rr.description}
    Rating: ${rr.rating}
    Location: (${rr.lat}, ${rr.long})
    Maps: ${rr.maps_url}
    Website: ${rr.website}
    Phone: ${rr.phone}
    Type ID: ${rr.resource_type_id}
    Last Updated: ${rr.updated_at}
  `.trim();
}