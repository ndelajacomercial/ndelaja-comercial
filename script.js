const productos = [
  {
    categoria: "Ropa",
    nombre: "Remera Negra Oversize",
    precio: 70000,
    stock: 5,
    imagen: "assets/remera.jpg"
  },
  {
    categoria: "Ropa",
    nombre: "Campera Jeans",
    precio: 180000,
    stock: 2,
    imagen: "assets/campera.jpg"
  },
  {
    categoria: "Calzados",
    nombre: "Zapatilla Urbana",
    precio: 150000,
    stock: 4,
    imagen: "assets/zapatilla.jpg"
  },
  {
    categoria: "Calzados",
    nombre: "Botines de cuero",
    precio: 220000,
    stock: 3,
    imagen: "assets/botines.jpg"
  },
  {
    categoria: "Accesorios",
    nombre: "Gorra plana",
    precio: 50000,
    stock: 6,
    imagen: "assets/gorra.jpg"
  },
  {
    categoria: "Accesorios",
    nombre: "Lentes de sol",
    precio: 60000,
    stock: 0,
    imagen: "assets/lentes.jpg"
  },
  {
    categoria: "Termos",
    nombre: "Termo Stanley 1L",
    precio: 250000,
    stock: 2,
    imagen: "assets/termo.jpg"
  },
  {
    categoria: "Termos",
    nombre: "Mate + Bombilla combo",
    precio: 120000,
    stock: 1,
    imagen: "assets/mate.jpg"
  },
  {
    categoria: "Vapes",
    nombre: "Vape Desechable 1500puf",
    precio: 90000,
    stock: 8,
    imagen: "assets/vape.jpg"
  },
  {
    categoria: "Vapes",
    nombre: "Vape 5000puf recargable",
    precio: 150000,
    stock: 0,
    imagen: "assets/vape2.jpg"
  }
];

const contenedor = document.getElementById("contenedor-categorias");

const categorias = [...new Set(productos.map(p => p.categoria))];

categorias.forEach(categoria => {
  const productosCategoria = productos.filter(p => p.categoria === categoria && p.stock > 0);

  if (productosCategoria.length > 0) {
    const div = document.createElement("div");
    div.className = "categoria";
    div.innerHTML = `<h2>${categoria}</h2>`;

    productosCategoria.forEach(producto => {
      const prod = document.createElement("div");
      prod.className = "producto";
      prod.innerHTML = `
        <h3>${producto.nombre}</h3>
        <img src="${producto.imagen}" alt="${producto.nombre}" />
        <p>Precio: Gs. ${producto.precio.toLocaleString()}</p>
        <label>
          Cantidad: 
          <input type="number" min="1" max="${producto.stock}" value="1" id="cantidad-${producto.nombre}" />
        </label>
        <button onclick="comprar('${producto.nombre}', ${producto.precio}, '${producto.categoria}', '${producto.imagen}', ${producto.stock})">
          Comprar por WhatsApp
        </button>
      `;
      div.appendChild(prod);
    });

    contenedor.appendChild(div);
  }
});

function comprar(nombre, precio, categoria, imagen, stock) {
  const cantidad = parseInt(document.getElementById(`cantidad-${nombre}`).value);
  if (cantidad < 1 || cantidad > stock) {
    alert("Cantidad inválida");
    return;
  }

  let total = precio * cantidad;
  let mensaje = `Hola, quiero comprar ${cantidad}x ${nombre} (${categoria}). Total: Gs. ${total.toLocaleString()}`;

  if (cantidad >= 3) {
    const descuento = total * 0.2;
    total = total - descuento;
    mensaje += `\n✅ Accedí al 20% de descuento mayorista.\nTotal con descuento: Gs. ${total.toLocaleString()}`;
  }

  const telefono = "595987654321";
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}
