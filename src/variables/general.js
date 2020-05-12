import React from "react";

// @material-ui/icons
import Build from "@material-ui/icons/Build";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import SpaIcon from "@material-ui/icons/Spa";
import FilterVintageIcon from "@material-ui/icons/FilterVintage";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import ChartistGraph from "react-chartist";
import { straightLinesChart } from "./charts";
import Table from "../components/Table/Table";

// ##############################
// // // stories for Widgets view
// #############################

const widgetStories = [
  {
    // First story
    inverted: true,
    badgeColor: "danger",
    badgeIcon: LiveHelpIcon,
    title: "Sobre el mango",
    titleColor: "danger",
    body: (
      <div>
        <Table
          hover
          tableHead={["Temática", "Información"]}
          tableData={[
            [
              "Desfase en el cultivo del mango",
              <a
                href="http://www.asohofrucol.com.co/archivos/Libros/Desfase_de_cosecha_de_Mango_Fase_II_2019.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Click Aquí{" "}
              </a>
            ],
            [
              "Podemos bien los cultivos de mango",
              <a
                href="http://www.asohofrucol.com.co/archivos/Libros/Podemos_Bien_los_Cultivos_de_Mango_2012.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Click Aquí{" "}
              </a>
            ],
            [
              "Abonado y riego del mango",
              <a
                href="https://www.icia.es/icia/download/noticias/CharlaMango.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Click Aquí{" "}
              </a>
            ]
          ]}
        />
      </div>
    )
  },
  {
    // Second story
    inverted: true,
    badgeColor: "success",
    badgeIcon: ControlPointIcon,
    title: "Sobre los cítricos",
    titleColor: "success",
    body: (
      <div>
        <Table
          hover
          tableHead={["Temática", "Información"]}
          tableData={[
            [
              "Polinización Con Abejas en Cultivos de Cítricos",
              <a
                href="http://www.asohofrucol.com.co/archivos/Libros/Polinizaci%C3%B3n_Con_Abejas_en_Cultivos_de_C%C3%ADtricos_2012.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Click Aquí{" "}
              </a>
            ],
            [
              "Podemos Bien los Cultivos de Cítricos",
              <a
                href="http://www.asohofrucol.com.co/archivos/Libros/Podemos_Bien_los_Cultivos_de_C%C3%ADtricos_2012.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Click Aquí{" "}
              </a>
            ],
            [
              "Abonado y fertilización de cítricos",
              <a
                href="https://www.grupoinesta.com/abono-para/citricos/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Click Aquí{" "}
              </a>
            ]
          ]}
        />
      </div>
    )
  },
  {
    // Third story
    inverted: true,
    badgeColor: "info",
    badgeIcon: SpaIcon,
    title: "Sobre el aguacate",
    titleColor: "info",
    body: (
      <div>
        <Table
          hover
          tableHead={["Temática", "Información"]}
          tableData={[
            [
              "Polinización Con Abejas en Cultivos de Aguacate",
              <a
                href="http://www.asohofrucol.com.co/archivos/Libros/Polinizaci%C3%B3n_Con_Abejas_en_Cultivos_de_Aguacate_2012.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Click Aquí{" "}
              </a>
            ],
            [
              "Podemos bien los cultivos de aguacate",
              <a
                href="http://www.asohofrucol.com.co/archivos/Libros/Podemos_Bien_los_Cultivos_de_Aguacate_2012.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Click Aquí{" "}
              </a>
            ],
            [
              "Manejo fitosanitario del cultivo de aguacate (Hass)",
              <a
                href="https://www.ica.gov.co/getattachment/4b5b9b6f-ecfc-46e1-b9ca-b35cc1cefee2/-"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Click Aquí{" "}
              </a>
            ]
          ]}
        />
      </div>
    )
  },
  {
    // Fourth story
    badgeColor: "warning",
    badgeIcon: FilterVintageIcon,
    title: "Sobre el Banano",
    titleColor: "warning",
    body: (
      <div>
        <Table
          hover
          tableHead={["Temática", "Información"]}
          tableData={[
            [
              "Buenas prácticas en el cultivo de banano",
              <a
                href="http://cep.unep.org/repcar/proyectos-demostrativos/colombia-1/publicaciones-colombia/cartilla-banano-definitiva.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Click Aquí{" "}
              </a>
            ],
            [
              "Abonado de cultivo de banano orgánico",
              <a
                href="https://www.agrorural.gob.pe/wp-content/uploads/transparencia/dab/material/ficha%20tecnica%20banano.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Click Aquí{" "}
              </a>
            ]
          ]}
        />
      </div>
    )
  }
];

// ##############################
// // // stories for Timeline view
// #############################

const stories = [
  {
    // First story
    inverted: true,
    badgeColor: "danger",
    badgeIcon: LiveHelpIcon,
    title: "Sobre el mango",
    titleColor: "danger",
    body: (
      <div>
        <p>Sobre el mango</p>
        <ChartistGraph
          className="ct-chart-white-colors"
          data={straightLinesChart.data}
          type="Line"
          options={straightLinesChart.options}
          responsiveOptions={straightLinesChart.responsiveOptions}
          listener={straightLinesChart.animation}
        />
      </div>
    )
  },
  {
    // Second story
    badgeColor: "success",
    badgeIcon: ControlPointIcon,
    title: "Sobre los cítricos",
    titleColor: "success",
    body: <p>Sobre los cítricos</p>
  },
  {
    // Third story
    inverted: true,
    badgeColor: "info",
    badgeIcon: SpaIcon,
    title: "Sobre el aguacate",
    titleColor: "info",
    body: (
      <div>
        <p>Sobre el aguacate</p>
      </div>
    ),
    footer: (
      <CustomDropdown
        buttonIcon={Build}
        buttonProps={{
          round: true,
          style: { marginBottom: "0" },
          color: "info"
        }}
        dropdownList={[
          "Action",
          "Another action",
          "Something else here",
          { divider: true },
          "Separated link"
        ]}
      />
    )
  },
  {
    // Fourth story
    badgeColor: "warning",
    badgeIcon: FilterVintageIcon,
    title: "Sobre el Banano",
    titleColor: "warning",
    body: <p>Sobre el banano</p>
  }
];

// ##############################
// // // data for populating the calendar in Calendar view
// #############################

var today = new Date();
var y = today.getFullYear();
var m = today.getMonth();
var d = today.getDate();

const events = [
  {
    title: "Poda sanitaria",
    allDay: true,
    start: new Date(y, m, d + 1),
    end: new Date(y, m, d + 2),
    color: "default"
  },
  {
    title: "Fumigación contra ácaros",
    start: new Date(y, m, d + 1),
    end: new Date(y, m, d + 3),
    allDay: true,
    color: "green"
  },
  {
    title: "Riego manual",
    start: new Date(y, m, d + 3, 12, 0),
    end: new Date(y, m, d + 5, 14, 0),
    allDay: false,
    color: "red"
  },
  {
    title: "Fertilización para producción",
    start: new Date(y, m, d + 4),
    end: new Date(y, m, d + 7),
    allDay: true,
    color: "azure"
  },
  {
    title: "Poda de formación",
    start: new Date(y, m, d + 4, 19, 0),
    end: new Date(y, m, d + 8, 22, 30),
    allDay: false,
    color: "azure"
  },
  {
    title: "Limpieza/Recoger frutos dañados",
    start: new Date(y, m, d + 6),
    end: new Date(y, m, d + 9),
    color: "orange"
  },
  {
    title: "Siembra de un mango",
    start: new Date(y, m, d + 11),
    end: new Date(y, m, d + 15),
    color: "rose"
  }
];

// ##############################
// // // Tasks for TasksCard - see Widget view
// #############################

var bugs = [
  "Mosca de la fruta: Insecto que produce una vía de entrada de hongos y bacterias que descomponen la fruta. Produce una maduración precoz y caída del fruto.",
  "Trips: Producen deformación en el crecimiento de la fruta, daño en forma de puntos amarillos, blancos o plateados, así como residuos de color negro.",
  "Hormiga arriera: Es común verlas cortando fragmentos de hojas de árboles y arbustos. Debido a ello, si se convierte en una plaga, consumen la planta.",
  "Hemípteros: En infestaciones severas puede haber defoliación prematura, así como una afectación estética en el follaje por las picaduras y por los excrementos."
];
var website = [
  "Antracnosis: hongo que causa daños en hojas, tallos y frutos, aparecen lesiones negras en la fruta.",
  "Lasiodiplodia: Es un hongo que causa muerte regresiva del mango, se ve sequedad y posteriormente hay pudrición acuosa.",
  "Mildiu: Es un hongo cuyos brotes se dan en floración, es visto como polvo blanco que quema la flora",
  "Mancha foliar: En las hojas se observan manchas pequeñas de forma irregular, son de color café y están sobre toda la superficie de la hoja."
];
var server = [
  "Recolección de frutos podridos: Lo ideal es recoger los frutos y enterrarlos.",
  "Remover cualquier maleza después de la etapa de cosecha.",
  "Dejar descansar el huerto un mes de cualquier tipo de actividad.",
  "Desinfectar el área donde se vaya a cultivar (sembrar)"
];

// ##############################
// // // data for datatables.net in DataTables view
// #############################

const dataTable = {
  headerRow: ["Name", "Position", "Office", "Age", "Actions"],
  footerRow: ["Name", "Position", "Office", "Age", "Actions"],
  dataRows: [
    ["Poda", "Sanitaria", "06/05/20", <input type={"text"} value={"2.560.000"}></input>],
    ["Fumigación", "Ácaros", "05/04/20", <input type={"text"} value={"3.445.000"}></input>],
    ["Riego", "Manual", "07/05/20", <input type={"text"} value={"1.908.600"}></input>],
    ["Fertilización", "Crecimiento", "07/05/20", <input type={"text"} value={"230.000"}></input>],
    ["Poda", "Formación", "08/05/20", <input type={"text"} value={"1.200.000"}></input>]
  ]
};

export {
  // data for React Big Calendar in Calendar view
  events,
  // stories for Widgets view
  widgetStories,
  // stories for Timeline view
  stories,
  // these 3 are used to create the tasks lists in TasksCard - Widget view
  bugs,
  website,
  server,
  // data for datatables.net in DataTables view
  dataTable
};
