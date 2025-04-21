export interface Pelicula {
id: string;
titulo: string;
descripcion: string;
imagen: string;
anio: number;
precio: {
    moneda: string;
    real: number;
};

}
