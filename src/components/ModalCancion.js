import { Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Input, ModalFooter, Button } from "reactstrap"
import { useState, useEffect } from "react";

const modeloDefaultCancion = {
    id: '',
    nombre: '',
    genero: '',
    banda: '',
    discografica: ''
}

const ModalCancion = ({ showModalCancion, setShowModalCancion, setCancionAEditar, cancionAEditar, guardarCancion, editarCancion }) => {

    const [currentCancionData, setCurrentCancionData] = useState(modeloDefaultCancion);

    const actualizaDato = (e) => {
        console.log(e.target.name + " : " + e.target.value);

        setCurrentCancionData({
            ...currentCancionData, [e.target.name]: e.target.value
        });
    }

    const enviarDatos = () => {
        if (currentCancionData.id == 0) {
            guardarCancion(currentCancionData);

        } else {
            editarCancion(currentCancionData); //
        }

        setCurrentCancionData(modeloDefaultCancion);
    }

    useEffect(() => {
        if (cancionAEditar != null) {
            setCurrentCancionData(cancionAEditar);
        } else {
            setCurrentCancionData(modeloDefaultCancion);
        }

        // setCurrentCancionData(modeloDefaultCancion);
    }, [cancionAEditar])

    const cerrarModal = () => {
        setShowModalCancion(!showModalCancion);
        setCancionAEditar(null);
    }

    return (
        <Modal isOpen={showModalCancion}>
            <ModalHeader>
                {currentCancionData.id == 0 ? "Nuevo canción" : "Editar canción"}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input required name="nombre" onChange={(e) => actualizaDato(e)} value={currentCancionData.nombre} />
                    </FormGroup>

                    <FormGroup>
                        <Label>Genero</Label>
                        <Input required name="genero" onChange={(e) => actualizaDato(e)} value={currentCancionData.genero} />
                    </FormGroup>

                    <FormGroup>
                        <Label>Banda</Label>
                        <Input required name="banda" onChange={(e) => actualizaDato(e)} value={currentCancionData.banda} />
                    </FormGroup>

                    <FormGroup>
                        <Label>Discografica</Label>
                        <Input required name="discografica" onChange={(e) => actualizaDato(e)} value={currentCancionData.discografica} />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" size="sm" onClick={enviarDatos} >Guardar</Button>
                <Button color="danger" size="sm" onClick={cerrarModal} >Cerrar</Button>
            </ModalFooter>

        </Modal>
    )
}

export default ModalCancion;
