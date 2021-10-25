import { useEffect, useState } from "react"
import { Col, Row, Card } from "react-bootstrap"
import { IconButton } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import Swal from "sweetalert2"
import "sweetalert2/src/sweetalert2.scss"
// Firebase
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"

import { db } from "../../firebase/Cliente"

export default function ListTareas({
  tareas,
  setTareas,
  setModoEdit,
  setTarea,
  formik,
}) {
  const [loading, setLoading] = useState(false)

  const handleState = (uid, name, descrip) => {
    setModoEdit(true)
    setTarea({
      id: uid,
      nameTarea: name,
      descripTarea: descrip,
    })
    formik.setFieldValue("nameTarea", name)
    formik.setFieldValue("descripTarea", descrip)
  }

  const handleEliminar = (indexTarea, uid) => {
    Swal.fire({
      icon: "warning",
      iconColor: "#e74a3b",
      showCancelButton: true,
      confirmButtonColor: "#4e73df",
      cancelButtonColor: "#e74a3b",
      title: "Eliminar?",
      text: "Accion irréversible!!",
      confirmButtonText: "Si, eliminarlo!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, "Tareas", uid))
          const arrayFiltrado = tareas.filter(
            (_, index) => index !== indexTarea
          )
          setTareas(arrayFiltrado)
          Swal.fire("Eliminado!", "", "success")
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const dataFirebase = await getDocs(collection(db, "Tareas"))
        const arrayData = dataFirebase.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setTareas(arrayData)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }
    getData()
  }, [])
  // Colores
  const colors = ["#31393c", "#2176ff", "#33a1fd", "#fdca40", "#f79824"]
  return (
    <>
      <Col xl={6} lg={6}>
        <h2 className="text-center text-uppercase">Lista de tareas</h2>

        {tareas.length === 0 ? (
          loading === true ? (
            <Row className="mt-4 mb-4">
              <Col className="d-flex justify-content-center">
                <Card
                  style={{ width: "30rem", backgroundColor: "#33a1fd" }}
                  className="text-white"
                >
                  <Card.Body className="text-center">
                    <Card.Text>Cargando....</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ) : (
            <Row className="mt-4 mb-4">
              <Col className="d-flex justify-content-center">
                <Card
                  style={{ width: "30rem", backgroundColor: "#33a1fd" }}
                  className="text-white"
                >
                  <Card.Body className="text-center">
                    <Card.Text>No hay Tareas Registradas.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )
        ) : (
          tareas.map((item, index) => (
            <Row className="mt-4 mb-4" key={index}>
              <Col className="d-flex justify-content-center">
                <Card
                  style={{ width: "30rem", backgroundColor: colors[index % 5] }}
                  className="text-white"
                >
                  <Card.Header className="text-center">
                    {item.nameTarea}
                  </Card.Header>
                  <Card.Body className="text-center">
                    <Card.Text>{item.descripTarea}</Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-center">
                    <IconButton
                      aria-label="editTarea"
                      style={{ color: "#efefd0" }}
                      onClick={() => {
                        handleState(item.id, item.nameTarea, item.descripTarea)
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="deleteTarea"
                      color="error"
                      onClick={() => {
                        handleEliminar(index, item.id)
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          ))
        )}
      </Col>
    </>
  )
}
