import React, { useState, useEffect } from 'react'

const Search = () => {

    const [vuelos, setVuelos] = useState([])
    const [search, setSearch] = useState('')

  
    const api = "https://raw.githubusercontent.com/flybondi/dev-challenge/master/dataset.json"
    const getApi = async() => {
        const data =  await fetch(api)
        const resultado =  await data.json()
        // odeno por precios
        setVuelos(resultado.sort((a, b) => (a.price > b.price ? 1 : a.price < b.price ? -1 : 0)))
    }

    const searcher = (e) => {
        setSearch(e.target.value)
    }

    const results = !search ? vuelos : vuelos.filter((dato)=> dato.price <= search)


    useEffect( () => {
        getApi()
    },[])

  return (
    <React.Fragment>
        <input 
            className='form-control mt-5 border border-dark'   
            type="text" 
            placeholder='INGRESE DINERO DISPONIBLE' 
            value={search}
            onChange={searcher}
         />
        <table className='table table-striped table-hover mt-5 shadow-lg'>
        <thead>
                <tr className='bg-curso text-white'>
                    <th>Fecha</th>
                    <th>origen</th>
                    <th>Destino</th>
                    <th>Precio</th>
                    <th>Disponibilidad</th>
                </tr>
            </thead> 
            <tbody>
                { results.map( (vuelos) => (
                    <tr key={vuelos.id}>
                        <td>{vuelos.data}</td>
                        <td>{vuelos.origin}</td>
                        <td>{vuelos.destination}</td>
                        <td>{vuelos.price}</td>
                        <td>{vuelos.availability}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </React.Fragment>
  )
}

export default Search