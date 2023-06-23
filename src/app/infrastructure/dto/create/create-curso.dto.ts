export interface CrearCursoDto {
  titulo: string;

  imagen?: string;

  descripcion?: string;

  categoria: string;

  detalle?: string;
  
  precio: number;

  tituloPrograma?: string[];
  
  descripcionPrograma?: string[];
}
