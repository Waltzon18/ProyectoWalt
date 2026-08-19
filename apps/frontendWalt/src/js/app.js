const btnCargar = document.querySelector('#btn-cargar');
const contenedorCards = document.querySelector('#contenedor-cards');

async function obtenerClasica() {
    try {
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
        const listaDatos = await respuesta.json();

        contenedorCards.innerHTML = '';

        for (let item of listaDatos) {
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <h3>Maestro: ${item.name}</h3>
                <p><strong>Colección:</strong> Repartorio Clásico #${item.id}</p>
                <p><strong>Contacto / Ficha:</strong> ${item.email}</p>
                <p><strong>Sede:</strong> Orquesta de ${item.address.city}</p>
            `;

            contenedorCards.appendChild(card);
        }
    } catch (error) {
        console.error('Error al cargar la música:', error);
    }
}

btnCargar.addEventListener('click', obtenerClasica);