const btnCargar = document.querySelector('#btn-cargar');
const contenedorCards = document.querySelector('#contenedor-cards');

async function obtenerClasica() {
    try {
        const respuesta = await fetch('http://localhost:3000/api/compositores');
        const listaDatos = await respuesta.json();

        contenedorCards.innerHTML = '';

        for (let item of listaDatos) {
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <h3>Maestro: ${item.nombre || item.name}</h3>
                <p><strong>Estilo:</strong> ${item.estilo || 'Clásico'}</p>
                <p><strong>Obras:</strong> ${item.obras ? item.obras.join(', ') : 'N/A'}</p>
            `;

            contenedorCards.appendChild(card);
        }
    } catch (error) {
        console.error('Error al cargar la música:', error);
    }
}

btnCargar.addEventListener('click', obtenerClasica);