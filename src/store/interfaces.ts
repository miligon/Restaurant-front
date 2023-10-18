//Definition for ticket objects recieved from server
export interface ticketFromServer {
    code: string,
    restaurant: number,
    name: string,
    max_purchase_count: number,
    purchase_count: number,
    soldout: boolean,
}

//Definition for ticket objects sent to server
export interface ticketToServer {
    code: string | undefined,
    restaurant: string,
    name: string,
    max_purchase_count: number,
    purchase_count: number,
    soldout: boolean | undefined,
}


//Definition for restaurant objects
export interface restaurant {
    id: string,
    name: string,
    slug: string,
    owner: number,
}

// Definition for token object saved on localstorage
export interface LocalStorageDataToken {
    refresh: string,
    access: string,
}