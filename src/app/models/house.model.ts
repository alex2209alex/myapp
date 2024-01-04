export class House {
    id: string | null;
    email: string;
    urlImg: string;
    title: string;
    description: string;
    price: number;

    constructor() {
        this.id = '';
        this.email = '';
        this.price = 0;
        this.description = '';
        this.urlImg = '';
        this.title = '';
    }
}
