import { useState } from "react"
import { Container, Row } from "react-bootstrap"
import FormTarea from "./FormTarea"
import ListTareas from "./ListTareas"
import { useFormik } from "formik"
// Validacion del formulario
import * as Yup from "yup"
// Firebase
import { db } from "../../firebase/Cliente"
import { collection, addDoc, doc, updateDoc } from "firebase/firestore"

// ====================================================

// Validacion
const validate = Yup.object({
  nameTarea: Yup.string().required("Ingrese nombre de la tarea."),
  descripTarea: Yup.string().required("Ingrese descripción de la tarea."),
})

export default function Body() {
  const [tareas, setTareas] = useState([])
  const [tarea, setTarea] = useState({})
  const [modoEdit, setModoEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      nameTarea: "",
      descripTarea: "",
    },
    validationSchema: validate,
    onSubmit: async (data) => {
      try {
        if (modoEdit) {
          setLoading(true)
          const docRef = doc(db, "Tareas", tarea.id)
          await updateDoc(docRef, {
            nameTarea: formik.values.nameTarea,
            descripTarea: formik.values.descripTarea,
          })
          const arrayEditado = tareas.map((item) =>
            item.id === tarea.id
              ? {
                  id: item.id,
                  nameTarea: formik.values.nameTarea,
                  descripTarea: formik.values.descripTarea,
                }
              : item
          )
          setTareas(arrayEditado)
          setLoading(false)
          formik.handleReset()
          setModoEdit(false)
          setTarea({})
        } else {
          setLoading(true)
          const docRef = await addDoc(collection(db, "Tareas"), data)
          setTareas([...tareas, { id: docRef.id, ...data }])
          setLoading(false)
          formik.handleReset()
        }
      } catch (error) {
        console.error(error)
      }
    },
  })
  return (
    <>
      <Container className="mt-5">
        <Row>
          <ListTareas
            tareas={tareas}
            setTareas={setTareas}
            setModoEdit={setModoEdit}
            setTarea={setTarea}
            formik={formik}
          />
          <FormTarea modoEdit={modoEdit} loading={loading} formik={formik} />
        </Row>
      </Container>
    </>
  )
}
