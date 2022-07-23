import { Formik, Form, Field } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Alerta from "./Alerta";
import Spinner from "./Spinner";

const Formulario = ({ cliente, cargando }) => {
  const navigate = useNavigate();

  const nuevoClieenteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El nombre es muy corto")
      .required("El nombre es requerido")
      .max(20, "El nombre es muy largo"),
    empresa: Yup.string().required("El nombre de la empresa es requerido"),
    email: Yup.string()
      .email("Email no valido")
      .required("El email es requerido"),
    telefono: Yup.number("")
      .integer("Numero no valido")
      .positive("Numero no valido")
      .typeError("El telefono debe ser numerico"),
  });

  const handleSubmit = async (values) => {
    try {
      // para editar un registro

      let respuesta;

      if (cliente.id) {
        const url = `http://localhost:4000/clientes/${cliente.id}`;
        respuesta = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      // para crear un nuevo cliente
      else {
        const url = "http://localhost:4000/clientes";
        respuesta = await fetch(url, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      await respuesta.json();
      navigate("/clientes");
    } catch (error) {
      console.log(error);
    }
  };

  return cargando ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {cliente?.nombre ? "Editar Cliente" : "Nuevo Cliente"}
      </h1>
      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? "",
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={nuevoClieenteSchema}
      >
        {({ errors, touched }) => {
          // console.log(data);

          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label htmlFor="nombre" className="text-gray-800 ">
                  Nombre:
                </label>
                <Field
                  name="nombre"
                  id="nombre"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Nombre Cliente"
                />
                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : null}
              </div>

              <div className="mb-4">
                <label htmlFor="empresa" className="text-gray-800 ">
                  Empresa:
                </label>
                <Field
                  name="empresa"
                  id="empresa"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Nombre Empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : null}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="text-gray-800 ">
                  Email:
                </label>
                <Field
                  name="email"
                  id="email"
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Nombre Cliente"
                />
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : null}
              </div>

              <div className="mb-4">
                <label htmlFor="telefono" className="text-gray-800 ">
                  Telefono:
                </label>
                <Field
                  name="telefono"
                  id="telefono"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Telefono"
                />
                {errors.telefono && touched.telefono ? (
                  <Alerta>{errors.telefono}</Alerta>
                ) : null}
              </div>

              <div className="mb-4">
                <label htmlFor="notas" className="text-gray-800 ">
                  Notas:
                </label>
                <Field
                  name="notas"
                  as="textarea"
                  id="notas"
                  type="text"
                  className="h-40 mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Notas"
                />
              </div>
              <input
                type="submit"
                value={cliente?.nombre ? "Editar Cliente" : "Nuevo Cliente"}
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

Formulario.defaultProps = {
  cliente: {},
  cargando: false,
};
export default Formulario;
