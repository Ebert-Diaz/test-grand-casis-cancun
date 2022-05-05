import { useState, useEffect } from 'react'
import './App.css'


function App() {
    const [restaurantes, setRestaurantes] = useState();

    const [bares, setBares] = useState();

    const [detalle, setDetalles] = useState();
    
    // Optener el Dia actual
    const numeroDia = new Date().getDay();
    const dia = numeroDia-1
    
    const getRestauranes = async () => {
        const response = await fetch(`http://localhost:3000/api/restaurants/${dia}`)
        const responseJSON = await response.json()
        setRestaurantes(responseJSON);
    };

    const getBares = async () => {
        const response = await fetch(`http://localhost:3000/api/bares/${dia}`)
        const responseJSON = await response.json()
        setBares(responseJSON);
    };

    useEffect(() => {
        getRestauranes()
        getBares()

    }, []);

    const getDetalle = async (id) => {
        const response = await fetch(`http://localhost:3000/api/detalle?id=${id}&dia=${dia}`)
        const responseJSON = await response.json()
        setDetalles(responseJSON);
    }
    

    return (

        <div className="App">
            <div className='header'>
                <p> GRAND OASIS CANCUN</p>
            </div>

            <div className='restaurantes'>
                <h3>RESTAURANTES</h3>

                {
                    !restaurantes ? 'Cargando...':
                    restaurantes.map( ( restaurantes, index) => {
                        return <div className='car'>
                        <p>{ restaurantes.nombre }</p>
                        <p className='description'>{restaurantes.concepto_en}</p>
                        <h4>ABIERTO HOY</h4>
                        <p> {restaurantes.hora_inicio} - {restaurantes.hora_final} </p>
                        <a class="boton_personalizado" onClick={() => getDetalle(restaurantes.centro_consumo_id)} >VER MÁS</a>
                    </div>
                    })
                }


            </div>

            <div className='bares'>
                <h3>BARES</h3>

                {
                    !bares ? 'Cargando...':
                    bares.map( ( bares, index) => {
                        return <div className='car-bar'>
                        <p>{bares.nombre}</p>
                        
                        <h4>ABIERTO HOY</h4>
                        <p> {bares.hora_inicio} - {bares.hora_final} </p>
                        <a class="boton_personalizado-bar" onClick={() => getDetalle(bares.centro_consumo_id)} >VER MÁS</a>
                    </div>
                    })

                }          

            </div>

            <div className='detalle'>
                {
                    !detalle ? 'Cargando...':
                    detalle.map( ( detalle, index) => {
                        return <>
                        <h4>{detalle.nombre}</h4>
                        <div className='car-detalle'>
                            <img className='img-portada' src={`https://api-onow.oasishoteles.net/${detalle.img_portada}`} alt="" />
                            <img className='img-logo' src={`https://api-onow.oasishoteles.net/${detalle.logo}`} alt="" />
                        </div>
                        <div className='informacion'>
                            <div className='info-left'>
                                <h5> {detalle.nombre} </h5>
                                <p className='descript'>{detalle.concepto_en}</p>
                            </div>
                            <div className='info-right'>
                                <h4>ABIERTO HOY</h4>
                                <p> {detalle.hora_inicio} - {detalle.hora_final} </p>

                            </div>
                        </div>
                        </>
                    })
                }
                
            </div>
        </div>
    )
}

export default App
