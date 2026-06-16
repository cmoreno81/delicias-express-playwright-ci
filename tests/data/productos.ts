export type ProductoEsperado = {
  nombre: string;
  categoria: string;
  etiqueta: string;
  precio: string;
};

export const PRODUCTOS_ESPERADOS: ProductoEsperado[] = [
  { nombre: 'Lasaña casera', categoria: 'Pasta', etiqueta: 'Familiar', precio: '7,95 €' },
  { nombre: 'Ensalada mediterránea', categoria: 'Ensaladas', etiqueta: 'Saludable', precio: '5,95 €' },
  { nombre: 'Pollo al curry', categoria: 'Carnes', etiqueta: 'Especiado', precio: '8,50 €' },
  { nombre: 'Crema de calabaza', categoria: 'Cremas', etiqueta: 'Vegetal', precio: '4,95 €' },
  { nombre: 'Bowl vegetal', categoria: 'Vegetal', etiqueta: 'Saludable', precio: '7,25 €' },
  { nombre: 'Albóndigas con tomate', categoria: 'Carnes', etiqueta: 'Tradicional', precio: '7,75 €' },
  { nombre: 'Tortilla de patata', categoria: 'Tradicional', etiqueta: 'Clásico', precio: '5,50 €' },
  { nombre: 'Arroz con verduras', categoria: 'Arroces', etiqueta: 'Vegetal', precio: '6,75 €' },
  { nombre: 'Pasta carbonara', categoria: 'Pasta', etiqueta: 'Cremoso', precio: '7,50 €' },
  { nombre: 'Salmón con patatas', categoria: 'Pescados', etiqueta: 'Saludable', precio: '9,95 €' }
];
