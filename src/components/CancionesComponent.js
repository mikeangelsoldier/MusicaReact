import { useState, useEffect } from 'react';
import { Col, Container, Row, Card, CardHeader, CardBody, Button } from "reactstrap"
import PaginationComponent from './PaginationComponent';
import ModalCancion from './ModalCancion';
import TablaCancion from './TablaCancion';


const CancionesComponent = () => {

  const [canciones, setCanciones] = useState([]);
  const [showModalCancion, setShowModalCancion] = useState(false);
  const [cancionAEditar, setCancionAEditar] = useState(null);


  /* Inicio Logica Paginación */
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);
  const totalPages = Math.ceil(canciones.length / itemsPerPage);

  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;
  const currentItems = canciones.slice(firstItem, lastItem);

  const handlePagina = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  /* ------------------------ */








  const mostrarCanciones = async () => {
    const response = await fetch("http://localhost:5132/api/Cancion");

    if (response.ok) {
      const data = await response.json();

      setCanciones(data);

      console.log("canciones: ", canciones);
    } else {
      console.log("Error en los datos de la lista");
    }
  }

  useEffect(() => {
    mostrarCanciones();
  }, [])


  const guardarCancion = async (cancion) => {
    const response = await fetch("http://localhost:5132/api/Cancion", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(cancion)
    })

    if (response.ok) {
      setShowModalCancion(!showModalCancion);
      mostrarCanciones();
    }
  }

  const editarCancion = async (cancion) => {
    const response = await fetch("http://localhost:5132/api/Cancion/" + cancion.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(cancion)
    })

    if (response.ok) {
      setShowModalCancion(!showModalCancion);
      mostrarCanciones();
    }
  }

  const eliminarCancion = async (id) => {

    var respuesta = window.confirm("¿Estás seguro de eliminar el elemento?");


    if (!respuesta) {
      return;
    }

    const response = await fetch("http://localhost:5132/api/Cancion/" + id, {
      method: 'DELETE',

    });
    /**  
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(cancion)
      */


    if (response.ok) {
      mostrarCanciones();
    }
  }



  return (
    <Container>
      <Row className="mt-5">
        <Col sm="12">
          <Card>
            <CardHeader>
              <h5>Lista de canciones</h5>
            </CardHeader>
            <CardBody>
              <Button size="sm" color="success" onClick={() => setShowModalCancion(!showModalCancion)}>Nueva canción</Button>
              <hr></hr>
              <TablaCancion data={currentItems}
                setCancionAEditar={setCancionAEditar}
                showModalCancion={showModalCancion}
                setShowModalCancion={setShowModalCancion}
                eliminarCancion={eliminarCancion}

              />
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                handlePagina={handlePagina}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <ModalCancion showModalCancion={showModalCancion}
        setShowModalCancion={setShowModalCancion}
        guardarCancion={guardarCancion}
        cancionAEditar={cancionAEditar}
        setCancionAEditar={setCancionAEditar}
        editarCancion={editarCancion}
      />
    </Container>
  );

}

export default CancionesComponent;