import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Formulario from '../components/Formulario'

const EditarCliente = () => {



  const { id } = useParams();
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerClienteApi = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setCargando(!cargando);
    };

    obtenerClienteApi();
  }, []);


  return (
    <>
    <h1 className='font-black text-4xl text-blue-900 '>Editar Cliente</h1>
    <p className='mt-3'>Utiliza este formularoo para editar un cliente</p>
    {cliente?.nombre ? (
      <Formulario cliente={cliente} cargando={cargando}/>
    ): <p>Cliente id no valido</p>}
</>
  )
}

export default EditarCliente