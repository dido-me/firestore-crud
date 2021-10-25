import { Col, Row } from "react-bootstrap"
import { LoadingButton } from "@mui/lab"
import { TextField } from "@mui/material"
import SaveIcon from "@mui/icons-material/Save"

export default function FormTarea({ modoEdit, loading, formik }) {
  return (
    <>
      <Col xl={6} lg={6}>
        <h2 className="text-center text-uppercase">
          {modoEdit ? "Editar tarea" : "Agregar tarea"}
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <Row>
            <Col>
              <TextField
                fullWidth
                id="nameTarea"
                disabled={loading}
                name="nameTarea"
                label="Nombre de la Tarea"
                variant="standard"
                value={formik.values.nameTarea}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.nameTarea && Boolean(formik.errors.nameTarea)
                }
                helperText={formik.touched.nameTarea && formik.errors.nameTarea}
              />
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <TextField
                fullWidth
                id="descripTarea"
                disabled={loading}
                name="descripTarea"
                label="Descripcion de la Tarea"
                multiline
                rows={4}
                variant="filled"
                value={formik.values.descripTarea}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.descripTarea &&
                  Boolean(formik.errors.descripTarea)
                }
                helperText={
                  formik.touched.descripTarea && formik.errors.descripTarea
                }
              />
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <LoadingButton
                fullWidth
                variant="contained"
                type="submit"
                loading={loading}
                color={modoEdit ? "warning" : "primary"}
                loadingIndicator="Cargando..."
                startIcon={<SaveIcon />}
              >
                {modoEdit ? "Editar Tarea" : "Guardar Tarea"}
              </LoadingButton>
            </Col>
          </Row>
        </form>
      </Col>
    </>
  )
}
