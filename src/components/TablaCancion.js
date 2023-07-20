import { Table, Button } from "reactstrap"
import { Outlet, Link } from "react-router-dom";

const TablaCancion = ({ data, setCancionAEditar, showModalCancion, setShowModalCancion, eliminarCancion }) => {

    const enviarDatos = (cancion) => {
        setCancionAEditar(cancion);
        setShowModalCancion(!showModalCancion);

    }


    return (
        <Table striped responsive>
            <thead>
                <tr>
                    {/*<th>Id</th>*/}
                    <th>Nombre</th>
                    <th>Genero</th>
                    <th>Banda</th>
                    <th>Discografica</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    (data.length < 1) ? (
                        <tr>
                            <td colSpan="4">Sin registros</td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.id}>
                                {/*<td>{item.id}</td>*/}
                                <td>{item.nombre}</td>
                                <td>{item.genero}</td>
                                <td>{item.banda}</td>
                                <td>{item.discografica}</td>
                                <td>
                                    <Button color="primary" size="sm" className="me-2" onClick={() => enviarDatos(item)} >Editar</Button>
                                    <Button color="danger" size="sm" onClick={() => eliminarCancion(item.id)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))
                    )
                }

            </tbody>
        </Table>
    )
}

export default TablaCancion;
